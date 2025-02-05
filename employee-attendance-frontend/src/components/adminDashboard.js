import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Drawer, Space, Table, Input, message } from "antd";
import axios from "../services/api";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import "../styles/dashboard.css";

const { Search } = Input;

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerType, setDrawerType] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [showLeaveRequests, setShowLeaveRequests] = useState(false);

  const username = location.state?.username || "Admin";
  const token = localStorage.getItem("token");

  const fetchLeaveRequests = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/leave/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaveRequests(data);
      setShowLeaveRequests(true);
    } catch (error) {
      message.error("Failed to fetch leave requests.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (username, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/leave/update/${username}`,
        { username, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success(`Leave request ${status}`);
    } catch {
      message.error("Failed to update status.");
    }
  };

  const handleLogout = () => {
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
      const response = await axios.get("/api/attendance/logs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAttendanceData(response.data);
      setFilteredData(response.data);
      setShowTable(true);
    } catch (error) {
      message.error("Failed to fetch attendance logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    const filtered = attendanceData.filter((item) => {
      const username = item.username || "";
      const loginTime = item.login_time || "";
      const logoutTime = item.logout_time || "";

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
          <Button onClick={fetchLeaveRequests} type="primary">
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

      {showLeaveRequests && (
        <div className="content-container">
          <div className="table-header">
            <h2>Leave Requests</h2>
            <button className="close-table-btn" onClick={() => setShowLeaveRequests(false)}>
              Close Table
            </button>
          </div>
          <Table
            columns={[
              { title: "Username", dataIndex: "username" },
              { title: "Start Date", dataIndex: "start_date" },
              { title: "End Date", dataIndex: "end_date" },
              { title: "Status", dataIndex: "status" },
              {
                title: "Actions",
                render: (record) => (
                  <>
                    <Button
                      onClick={() => updateStatus(record.username, "approved")}
                      type="primary"
                      className="mr-2"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => updateStatus(record.username, "rejected")}
                      type="danger"
                    >
                      Reject
                    </Button>
                  </>
                ),
              },
            ]}
            dataSource={leaveRequests}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            loading={loading}
          />
        </div>
      )}

      {showTable && (
        <div className="content-container">
          <div className="table-header">
            <Search
              placeholder="Search by username, login time, or logout time"
              onSearch={handleSearch}
              enterButton
            />
            <button className="close-table-btn" onClick={() => setShowTable(false)}>
              Close Table
            </button>
          </div>
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey={(record, index) => record.id || index}
            loading={loading}
            pagination={{ pageSize: 10 }}
            className="attendance-table"
          />
        </div>
      )}

      <Drawer
        title={drawerType === "create" ? "Create New User" : "Update User"}
        placement="right"
        onClose={closeDrawer}
        open={drawerType !== null}
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
