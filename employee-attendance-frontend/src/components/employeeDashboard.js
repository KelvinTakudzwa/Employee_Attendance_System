import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ClipLoader from "react-spinners/ClipLoader"; // Spinner component
import { Table, Button } from "antd"; // Ant Design components
import "../styles/dashboard.css"; // Import the CSS file
import LeaveRequestModal from "./LeaveRequestModal";
import { useQuery } from "@tanstack/react-query";
import  CheckOutModal  from "./CheckOutModal";

function EmployeeDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckOutModalOpen, setIsCheckOutModalOpen] = useState(false);
  const [attendance, setAttendance] = useState([]); // State to store attendance logs
  const [loading, setLoading] = useState({
    checkIn: false,
    checkOut: false,
    viewAttendance: false,
  });
  const [showTable, setShowTable] = useState(false); // Toggle visibility of table
  const [showLeaveTable, setShowLeaveTable] = useState(false);

  const handleToggleLeaveRequests = () => {
    setShowLeaveTable((prev) => !prev); // Toggle the leave requests table
  };

  const username = location.state?.username || "Employee"; // Extract username from navigation state
  const token = localStorage.getItem("token"); // Retrieve the JWT token from localStorage

  const notify = (message) => toast.success(message); // Success notification function

  const { data: leaveRequests, refetch } = useQuery({
    queryKey: ["leaveRequests"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/leave/${username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    },
  });

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
      toast.error(
        error.response?.data?.error || "Check-in failed. Please try again."
      );
    } finally {
      setLoading((prev) => ({ ...prev, checkIn: false })); // Stop loading
    }
  };

  // const handleCheckOut = async () => {
  //   setLoading((prev) => ({ ...prev, checkOut: true })); // Start loading
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/attendance/check-out",
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     notify(response.data.message);
  //   } catch (error) {
  //     toast.error(
  //       error.response?.data?.error || "Check-out failed. Please try again."
  //     );
  //   } finally {
  //     setLoading((prev) => ({ ...prev, checkOut: false })); // Stop loading
  //   }
  // };

  const handleViewAttendance = async () => {
    if (showTable) {
      setShowTable(false);
      return;
    }
    setLoading((prev) => ({ ...prev, viewAttendance: true })); // Start loading
    try {
      const response = await axios.get(
        "http://localhost:5000/api/attendance/user-logs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const formattedAttendance = response.data.map((record) => ({
        ...record,
        login_time: record.login_time
          ? new Date(record.login_time).toLocaleString()
          : "No Login Time",
        logout_time: record.logout_time
          ? new Date(record.logout_time).toLocaleString()
          : "Still Checked In",
      }));

      setAttendance(formattedAttendance);
      setShowTable(true);
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to fetch attendance logs."
      );
    } finally {
      setLoading((prev) => ({ ...prev, viewAttendance: false })); // Stop loading
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token on logout
    navigate("/");
  };

  const columns = [
    { title: "Login Time", dataIndex: "login_time", key: "login_time" },
    { title: "Logout Time", dataIndex: "logout_time", key: "logout_time" },
    { title: "Shift", dataIndex: "shift", key: "shift" },
    { title: "Summary", dataIndex: "summary", key: "summary" },
  ];

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h2>Welcome, {username}</h2>
        <div className="nav-buttons">
          <Button
            onClick={handleCheckIn}
            loading={loading.checkIn}
            
          >
            Check-In
          </Button>
          <Button
            onClick={()=> setIsCheckOutModalOpen(true)}
            loading={loading.checkOut}
            danger
          >
            Check-Out
          </Button>
          <Button
            onClick={handleViewAttendance}
            loading={loading.viewAttendance}
          >
            {showTable ? "Close Attendance" : "View Attendance"}
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>Request Leave</Button>
          <Button onClick={handleToggleLeaveRequests}>
            {showLeaveTable ? "Hide Leave Requests" : "Track Leave Requests"}
          </Button>
          <Button onClick={handleLogout}  danger>
            Logout
          </Button>
        </div>
      </nav>

      <div className="attendance-container">
        <h2>Attendance Records</h2>
        {showTable ? (
          <>
            <Button
              // className="close-table-btn"
              onClick={() => setShowTable(false)}
             
              style={{ marginBottom: "10px" }}
              danger
            >
              Close Table
            </Button>

            <Table
              columns={columns}
              dataSource={attendance}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </>
        ) : (
          <p>Click "View Attendance" to view your attendance records.</p>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      <LeaveRequestModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        refetch={refetch}
        username={username}
      />
      <CheckOutModal isOpen={isCheckOutModalOpen} closeModal={() => setIsCheckOutModalOpen(false)} token={token} notify={notify}/>

      {/* Leave Requests Table (Shown Only When Requested) */}
      {showLeaveTable && (
        <div className="leave-requests-container">
          <h2>My Leave Requests</h2>
            <Button
              // className="close-table-btn"
              onClick={() => setShowTable(false)}
             
              style={{ marginBottom: "10px" }}
              danger
            >
              Close Table
            </Button>
          <Table
            columns={[
              { title: "Start Date", dataIndex: "start_date" },
              { title: "End Date", dataIndex: "end_date" },
              { title: "Status", dataIndex: "status" },
            ]}
            dataSource={leaveRequests}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </div>
      )}
    </div>
  );
}

export default EmployeeDashboard;
