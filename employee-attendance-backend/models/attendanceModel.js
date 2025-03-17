const db = require("../config/db");

const getShift = (login_time) => {
  const hours = login_time.getHours();
  return (hours >= 8 && hours < 16.5) ? "Day Shift" : "Night Shift";
  
};
// Add a new check-in entry
const createCheckIn = async (username, login_time) => {

  
  try {
    const shift = getShift(login_time);
    const query = "INSERT INTO attendance_logs (username, login_time, shift) VALUES (?, ?, ?)";
    const [result] = await db.query(query, [username, login_time, shift]);
    return result;
  } catch (error) {
    console.error("Error creating check-in:", error);
    throw error;
  }
};

// Update check-out time for the latest check-in
const updateCheckOut = async (username, logout_time,summary) => {
  try {
    const query = `
      UPDATE attendance_logs
      SET logout_time = ?, summary = ?
      WHERE username = ? AND logout_time IS NULL
      ORDER BY login_time DESC
      LIMIT 1
    `;
    const [result] = await db.query(query, [logout_time, summary, username]);
    return result;
  } catch (error) {
    console.error("Error updating check-out:", error);
    throw error;
  }
};

// Fetch all attendance logs
const getAllAttendanceLogs = async () => {
  try {
    const query = "SELECT username, login_time, logout_time, shift , summary FROM attendance_logs ORDER BY login_time DESC";
    const [results] = await db.query(query);
    return results;
  } catch (error) {
    console.error("Error fetching attendance logs:", error);
    throw error;
  }
};

// Fetch attendance logs by username
const getAttendanceLogsByUsername = async (username) => {
  try {
    const query = `
      SELECT username, login_time, logout_time, shift, summary
      FROM attendance_logs
      WHERE username = ?
      ORDER BY login_time DESC
    `;
    const [results] = await db.query(query, [username]);
    return results;
  } catch (error) {
    console.error("Error fetching logs for user:", username, error);
    throw error;
  }
};

module.exports = { createCheckIn, updateCheckOut, getAllAttendanceLogs, getAttendanceLogsByUsername };
