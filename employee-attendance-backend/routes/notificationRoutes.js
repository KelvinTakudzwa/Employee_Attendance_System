const express = require("express");
const router = express.Router();
const { fetchUserNotifications, updateNotificationsAsRead } = require("../controllers/notificationController");

// Get notifications for a user
router.get("/:username", fetchUserNotifications);

// Mark notifications as read
router.put("/:username/read", updateNotificationsAsRead);

module.exports = router;
