import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Drawer, Space, Table, Typography, Input, message } from "antd";
import axios from "../services/api"; // Ensure the API service is properly configured
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import "../styles/dashboard.css"; // Import the CSS file

const { Search } = Input;

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerType, setDrawerType] = useState(null); // Track which drawer to show: 'create' or 'update'
  const [attendanceData, setAttendanceData] = useState([]); // Attendance logs
  const [filteredData, setFilteredData] = useState([]); // Filtered attendance logs
  const [loading, setLoading] = useState(false); // Loading state for table
  const [showTable, setShowTable] = useState(false); // Toggle table visibility

  const username = location.state?.username || "Admin";

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");
    navigate("/");
  };

  const showDrawer = (type) => {
    setDrawerType(type);
  };

  const closeDrawer = () => {
    setDrawerType(null);
  };

  const fetchAttendanceLogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) {
        message.error("Authentication token is missing. Please log in again.");
        handleLogout();
        return;
      }

      const response = await axios.get("/api/attendance/logs", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });

      setAttendanceData(response.data);
      setFilteredData(response.data); // Set filtered data initially to match all data
      setShowTable(true); // Show the table after fetching data
    } catch (error) {
      console.error("Failed to fetch attendance logs:", error);
      message.error("Failed to fetch attendance logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    const filtered = attendanceData.filter((item) => {
      const username = item.username || ""; // Fallback to an empty string if null
      const loginTime = item.login_time || ""; // Fallback to an empty string if null
      const logoutTime = item.logout_time || ""; // Fallback to an empty string if null

      return (
        username.toLowerCase().includes(value.toLowerCase()) ||
        loginTime.includes(value) ||
        logoutTime.includes(value)
      );
    });

    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username?.localeCompare(b.username),
    },
    {
      title: "Login Time",
      dataIndex: "login_time",
      key: "login_time",
      sorter: (a, b) => new Date(a.login_time) - new Date(b.login_time),
    },
    {
      title: "Logout Time",
      dataIndex: "logout_time",
      key: "logout_time",
      sorter: (a, b) => new Date(a.logout_time) - new Date(b.logout_time),
      render: (text) => (text ? text : "Still Logged In"),
    },
  ];

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h2>Welcome, {username}</h2>
        <div className="nav-buttons">
          <Button onClick={fetchAttendanceLogs} type="primary">
            View Attendance
          </Button>
          <Button onClick={() => alert("Leave Requests clicked")}>
            Leave Requests
          </Button>
          <Button onClick={() => alert("Generate Reports clicked")}>
            Generate Reports
          </Button>
          <Button onClick={() => showDrawer("create")} type="primary">
            Create User
          </Button>
          <Button onClick={() => showDrawer("update")} type="default">
            Update User
          </Button>
          <Button onClick={handleLogout} type="primary" danger>
            Logout
          </Button>
        </div>
      </nav>

      <div className="content-container">
        {showTable && (
          <div className="search-container">
            <Search
              placeholder="Search by username, login time, or logout time"
              onSearch={handleSearch}
              enterButton
            />
          </div>
        )}

        {showTable && (
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey={(record, index) => record.id || index}
            loading={loading}
            pagination={{ pageSize: 10 }}
            className="attendance-table"
          />
        )}
      </div>

      <Drawer
        title={drawerType === "create" ? "Create New User" : "Update User"}
        placement="right"
        onClose={closeDrawer}
        visible={drawerType !== null}
        width={400}
      >
        {drawerType === "create" && <CreateUser />}
        {drawerType === "update" && <UpdateUser />}
        <Space style={{ marginTop: 10 }} align="end">
          <Button onClick={closeDrawer} type="primary">
            Close
          </Button>
        </Space>
      </Drawer>
    </div>
  );
}

export default AdminDashboard;
