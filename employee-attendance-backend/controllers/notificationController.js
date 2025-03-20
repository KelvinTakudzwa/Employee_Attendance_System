const { getUserNotifications, markNotificationsAsRead } = require("../models/notificationModel");

// Fetch notifications for a user
const fetchUserNotifications = async (req, res) => {
    try {
        const notifications = await getUserNotifications(req.params.username);
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notifications" });
    }
};

// Mark notifications as read
const updateNotificationsAsRead = async (req, res) => {
    try {
        await markNotificationsAsRead(req.params.username);
        res.json({ message: "Notifications marked as read" });
    } catch (error) {
        res.status(500).json({ message: "Error updating notifications" });
    }
};

module.exports = { fetchUserNotifications, updateNotificationsAsRead };
