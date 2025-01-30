const express = require("express");
const { handleCheckIn, handleCheckOut , handleGetAttendanceLogs , handleGetUserAttendanceLogs } = require("../controllers/attendanceController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Check-in route
router.post("/check-in", authenticate, handleCheckIn);

// Check-out route
router.post("/check-out", authenticate, handleCheckOut);

// Fetch all attendance logs
router.get("/logs", authenticate, handleGetAttendanceLogs);

// Fetch user's attendance logs
router.get("/user-logs", authenticate, handleGetUserAttendanceLogs);

module.exports = router;
