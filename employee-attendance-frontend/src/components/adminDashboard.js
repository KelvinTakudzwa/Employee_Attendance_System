import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Drawer,
  Space,
  Table,
  Input,
  message,
  Select,
  Modal,
} from "antd";
import {
  LogoutOutlined,
  UserAddOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons"; // Importing icons
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "../services/api";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import "../styles/dashboard.css";
import DeleteUser from "./DeleteUser";

const { Search } = Input;
const { Option } = Select;

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen , setIsDeleteModalOpen] = useState(false);

  const username = location.state?.username || "Admin";
  const token = localStorage.getItem("token");

  const generateReport = async (fileType) => {
    setIsModalOpen(false);

    if (attendanceData.length === 0) {
      message.warning("Fetching attendance data...");
      await fetchAttendanceLogs();
    }
    if (attendanceData.length === 0) {
      message.warning("No attendance data to generate a report.");
      return;
    }

    setIsModalOpen(false); // Close modal only after checking data

    if (fileType === "csv") {
      const csvHeader = "Username,Login Time,Logout Time\n";
      const csvRows = attendanceData.map(
        (row) =>
          `${row.username},${row.login_time},${
            row.logout_time || "Still Logged In"
          }`
      );
      const csvContent = csvHeader + csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      FileSaver.saveAs(blob, "attendance_report.csv");
      message.success("CSV report generated!");
    } else if (fileType === "excel") {
      const worksheet = XLSX.utils.json_to_sheet(attendanceData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });

      FileSaver.saveAs(data, "attendance_report.xlsx");
      message.success("Excel report generated!");
    } else if (fileType === "pdf") {
      const doc = new jsPDF();
      doc.text("Attendance Report", 10, 10);

      const tableData = attendanceData.map((row) => [
        row.username || "N/A",
        row.login_time || "N/A",
        row.logout_time || "Still Logged In",
      ]);

      doc.autoTable({
        head: [["Username", "Login Time", "Logout Time"]],
        body: tableData,
      });

      doc.save("attendance_report.pdf");
      message.success("PDF report generated!");
    }
  };

  const fetchLeaveRequests = async () => {
    if (showLeaveRequests) {
      setShowLeaveRequests(false);
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.get("/api/leave/all", {
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
        `/api/leave/update/${username}`,
        { username, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success(`Leave request ${status}`);
      fetchLeaveRequests();
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

  const showReportModal = () => {
    setIsModalOpen(true);
  };

  const fetchAttendanceLogs = async () => {
    if (showTable) {
      setShowTable(false);
      return;
    }

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
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      sorter: (a, b) => a.shift?.localeCompare(b.shift),

    },
    {
      title: "Summary",
      dataIndex: "summary",
      key: "summary",
      sorter: (a, b) => a.summary?.localeCompare(b.summary),
      render: (text) => (text? text : "No Summary Provided"),
        
    
    }
  ];

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h2>Welcome, {username}</h2>
        <div className="nav-buttons">
          <Button onClick={fetchAttendanceLogs}>
            {showTable ? "Close Attendance" : "View Attendance"}
          </Button>
          <Button onClick={fetchLeaveRequests}>
            {showLeaveRequests ? "Close Leave Requests" : "Leave Requests"}
          </Button>
          <Button icon={<SearchOutlined />} onClick={showReportModal}>
            Generate Reports
          </Button>
          <Button
            onClick={() => showDrawer("create")}
            icon={<UserAddOutlined />}
          >
            Create User
          </Button>
          <Button
            onClick={() => showDrawer("update")}
            type="default"
            icon={<EditOutlined />}
          >
            Update User
          </Button>
          <Button danger onClick={()=> setIsDeleteModalOpen(true)}>Delete User</Button>
          <Button onClick={handleLogout} danger icon={<LogoutOutlined />}>
            Logout
          </Button>
        </div>
      </nav>
      {/*modal for file type selection*/}
      <Modal
        title="Select Report Format"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Select
          placeholder="Select file type"
          style={{ width: 120, marginRight: "10px" }}
          onChange={(value) => generateReport(value)}
        >
          <Option value="excel">Excel</Option>
          <Option value="pdf">PDF</Option>
          <Option value="csv">CSV</Option>
        </Select>
      </Modal>

      {showLeaveRequests && (
        <div className="content-container">
          <div className="table-header">
            <h2>Leave Requests</h2>
            <Button
              // className="close-table-btn"
              onClick={() => setShowTable(false)}
              style={{ marginBottom: "10px" }}
              danger
            >
              Close Table
            </Button>
          </div>
          <Table
            columns={[
              { title: "Username", dataIndex: "username" },
              { title: "Start Date", dataIndex: "start_date" },
              { title: "End Date", dataIndex: "end_date" },
              { title: "Reason", dataIndex: "reason"},
              { title: "Status", dataIndex: "status" },
              {
                title: "Actions",
                render: (record) =>
                  record.status === "Pending" ? (
                    <>
                      <Button
                        onClick={() =>
                          updateStatus(record.username, "approved")
                        }
                        className="mr-2"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() =>
                          updateStatus(record.username, "rejected")
                        }
                        type="danger"
                      >
                        Reject
                      </Button>
                    </>
                  ) : null, // Hide buttons if status is not "Pending"
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
            <h2>Attendance Logs</h2>
            <Search
              placeholder="Search by username, login time, or logout time"
              onSearch={handleSearch}
              enterButton
            />
            <Button
              onClick={() => setShowTable(false)} danger
              style={{ marginBottom: "5px" , marginTop: "5px"}}
              
            >
              Close Table
            </Button>
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
          <Button onClick={closeDrawer}>Close</Button>
        </Space>
      </Drawer>
      <DeleteUser isOpen={isDeleteModalOpen} onClose={() =>setIsDeleteModalOpen(false)}/>
    </div>
  );
}

export default AdminDashboard;
