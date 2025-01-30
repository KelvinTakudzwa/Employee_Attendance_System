import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader"; // Spinner component
import { Table, Button, message } from "antd"; // Ant Design components
import "../styles/dashboard.css"; // Import the CSS file

function EmployeeDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [attendance, setAttendance] = useState([]); // State to store attendance logs
  const [loading, setLoading] = useState({
    checkIn: false,
    checkOut: false,
    viewAttendance: false,
  });
  const [showTable, setShowTable] = useState(false); // Toggle visibility of table

  const username = location.state?.username || "Employee"; // Extract username from navigation state
  const token = localStorage.getItem("token"); // Retrieve the JWT token from localStorage

  const notify = (message) => toast.success(message); // Success notification function

  const handleCheckIn = async () => {
    setLoading((prev) => ({ ...prev, checkIn: true })); // Start loading
    try {
      const response = await axios.post(
        "http://localhost:5000/api/attendance/check-in",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      notify(response.data.message); // Use toast for notification
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Check-in failed. Please try again.";
      toast.error(errorMessage); // Use toast for error notification
    } finally {
      setLoading((prev) => ({ ...prev, checkIn: false })); // Stop loading
    }
  };

  const handleCheckOut = async () => {
    setLoading((prev) => ({ ...prev, checkOut: true })); // Start loading
    try {
      const response = await axios.post(
        "http://localhost:5000/api/attendance/check-out",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      notify(response.data.message); // Use toast for notification
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Check-out failed. Please try again.";
      toast.error(errorMessage); // Use toast for error notification
    } finally {
      setLoading((prev) => ({ ...prev, checkOut: false })); // Stop loading
    }
  };

  const handleViewAttendance = async () => {
    setLoading((prev) => ({ ...prev, viewAttendance: true })); // Start loading
    try {
      const response = await axios.get(
        "http://localhost:5000/api/attendance/user-logs",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token for authentication
          },
        }
      );

      // Format the fetched attendance logs
      const formattedAttendance = response.data.map((record) => ({
        ...record,
        login_time: record.login_time
          ? new Date(record.login_time).toLocaleString() // Parse and format login time
          : "No Login Time", // Fallback for missing login time
        logout_time: record.logout_time
          ? new Date(record.logout_time).toLocaleString() // Parse and format logout time
          : "Still Checked In", // Fallback for missing logout time
      }));

      setAttendance(formattedAttendance); // Update attendance state
      setShowTable(true); // Show the table after fetching data
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to fetch attendance logs.";
      toast.error(errorMessage); // Show error notification
    } finally {
      setLoading((prev) => ({ ...prev, viewAttendance: false })); // Stop loading
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token on logout
    navigate("/");
  };

  // Table columns definition
  const columns = [
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
      render: (text) => (text ? text : "Still Checked In"),
    },
  ];

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h2>Welcome, {username}</h2>
        <div className="nav-buttons">
          <Button
            onClick={handleCheckIn}
            loading={loading.checkIn}
            type="primary"
          >
            Check-In
          </Button>
          <Button
            onClick={handleCheckOut}
            loading={loading.checkOut}
            type="primary"
            danger
          >
            Check-Out
          </Button>
          <Button
            onClick={handleViewAttendance}
            loading={loading.viewAttendance}
          >
            View Attendance
          </Button>
          <Button onClick={() => alert("Request Leave clicked")}>
            Request Leave
          </Button>
          <Button onClick={() => alert("View Notifications clicked")}>
            View Notifications
          </Button>
          <Button onClick={handleLogout} type="primary" danger>
            Logout
          </Button>
        </div>
      </nav>

      <div className="attendance-container">
        <h2>Attendance Records</h2>
        {showTable ? (
          <Table
            columns={columns}
            dataSource={attendance}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            className="attendance-table"
          />
        ) : (
          <p>No attendance records to display. Click "View Attendance" to load your data.</p>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default EmployeeDashboard;
