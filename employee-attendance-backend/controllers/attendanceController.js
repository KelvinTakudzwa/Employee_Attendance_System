const { createCheckIn, updateCheckOut, getAllAttendanceLogs, getAttendanceLogsByUsername } = require("../models/attendanceModel");

// Handle user check-in
const handleCheckIn = async (req, res) => {
  try {
    const { username } = req.user; // Extract from token
    const login_time = new Date();

    const result = await createCheckIn(username, login_time);
    res.status(201).json({ message: "Check-in successful!", id: result.insertId });
  } catch (err) {
    console.error("Error during check-in:", err);
    res.status(500).json({ error: "Failed to check in." });
  }
};

// Handle user check-out
const handleCheckOut = async (req, res) => {
  try {
    const { username } = req.user; // Extract from token
    const logout_time = new Date();

    const result = await updateCheckOut(username, logout_time);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No open check-in record found." });
    }

    res.status(200).json({ message: "Check-out successful!" });
  } catch (err) {
    console.error("Error during check-out:", err);
    res.status(500).json({ error: "Failed to check out." });
  }
};

// Fetch all attendance logs
const handleGetAttendanceLogs = async (req, res) => {
  try {
    const results = await getAllAttendanceLogs();
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching attendance logs:", err);
    res.status(500).json({ error: "Failed to fetch attendance logs." });
  }
};

// Fetch attendance logs for a specific user
const handleGetUserAttendanceLogs = async (req, res) => {
  try {
    const { username } = req.user; // Extract username from token
    const results = await getAttendanceLogsByUsername(username);
    
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching attendance logs for user:", err);
    res.status(500).json({ error: "Failed to fetch attendance logs." });
  }
};

module.exports = { handleCheckIn, handleCheckOut, handleGetAttendanceLogs, handleGetUserAttendanceLogs };
