const db = require("../config/db");

// Create a new leave request
const createLeaveRequest = async (username, start_date, end_date, reason) => {
  try {
    const sql = `
      INSERT INTO leave_requests (username, start_date, end_date, reason, status, created_at) 
      VALUES (?, ?, ?, ?, 'Pending', NOW())
    `;
    const [result] = await db.query(sql, [username, start_date, end_date, reason]);
    return result;
  } catch (error) {
    console.error("Error creating leave request:", error);
    throw error;
  }
};

// Get all leave requests
const getAllLeaveRequests = async () => {
  try {
    const sql = "SELECT * FROM leave_requests ORDER BY created_at DESC";
    const [rows] = await db.query(sql);
    return rows;
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    throw error;
  }
};

// Get leave requests by username
const getLeaveRequestsByUsername = async (username) => {
  try {
    const sql = "SELECT * FROM leave_requests WHERE username = ? ORDER BY created_at DESC";
    const [rows] = await db.query(sql, [username]);
    return rows;
  } catch (error) {
    console.error("Error fetching leave requests by username:", error);
    throw error;
  }
};

// Update leave request status
const updateLeaveStatus = async (username, status) => {
  try {
    const sql = `
      UPDATE leave_requests 
      SET status = ? 
      WHERE username = ? AND status = 'Pending' 
      ORDER BY created_at DESC 
      LIMIT 1
    `;
    const [result] = await db.query(sql, [status, username]);
    console.log("Update Result:", result);
    return result;
  } catch (error) {
    console.error("Error updating leave status:", error);
    throw error;
  }
};


module.exports = {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestsByUsername,
  updateLeaveStatus,
};
