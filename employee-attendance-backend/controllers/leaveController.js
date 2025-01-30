const leaveModel = require("../models/LeaveRequest");

// Create a new leave request
const requestLeave = async (req, res) => {
  const { username, start_date, end_date, reason } = req.body;

  if (!username || !start_date || !end_date || !reason) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    await leaveModel.createLeaveRequest(username, start_date, end_date, reason);
    res.status(201).json({ message: "Leave request submitted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error submitting leave request." });
  }
};

// Get all leave requests (Admin)
const getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await leaveModel.getAllLeaveRequests();
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leave requests." });
  }
};

// Get leave requests by username (Employee)
const getLeaveRequestsByUsername = async (req, res) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({ message: "Username is required." });
  }

  try {
    const leaveRequests = await leaveModel.getLeaveRequestsByUsername(username);
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leave requests." });
  }
};

// Update leave request status (Admin)
const updateLeaveStatus = async (req, res) => {
  const { username } = req.params;
  const { status } = req.body;

  if (!username || !status) {
    return res.status(400).json({ message: "Username and status are required." });
  }

  try {
    await leaveModel.updateLeaveStatus(username, status);
    res.json({ message: "Leave status updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error updating leave status." });
  }
};

module.exports = {
  requestLeave,
  getAllLeaveRequests,
  getLeaveRequestsByUsername,
  updateLeaveStatus,
};
