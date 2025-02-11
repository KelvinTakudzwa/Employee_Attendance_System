const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");

// Employee submits a leave request
router.post("/request", leaveController.requestLeave);

// Admin gets all leave requests
router.get("/all", leaveController.getAllLeaveRequests);

// Employee gets their leave requests
router.get("/:username", leaveController.getLeaveRequestsByUsername);

// Admin updates leave status
router.put("/update/:username", leaveController.updateLeaveStatus);

module.exports = router;
