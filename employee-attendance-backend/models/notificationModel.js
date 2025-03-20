const db = require("../config/db");
const { io } = require("../server");
const { sendNotification} = require("../utils/socket");
// Save a new notification
// const createNotification = async (username, message, type) => {
//     try {
//         const query = `INSERT INTO notifications (username, message, type) VALUES (?, ?, ?)`;
//         await db.query(query, [username, message, type]);
//     } catch (error) {
//         console.error("Error creating notification:", error);
//         throw error;
//     }
// };

const createNotification = async (username, message, type) => {
    try {
        const query = `INSERT INTO notifications (username, message, type) VALUES (?, ?, ?)`;
        await db.query(query, [username, message, type]);

        // Send WebSocket notification
        sendNotification(username, message, type);
    } catch (error) {
        console.error("Error creating notification:", error);
        throw error;
    }
};

// Get all notifications for a user
const getUserNotifications = async (username) => {
    try {
        const query = `SELECT * FROM notifications WHERE username = ? ORDER BY created_at DESC`;
        const [results] = await db.query(query, [username]);
        return results;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
};

// Mark notifications as read
const markNotificationsAsRead = async (username) => {
    try {
        const query = `UPDATE notifications SET status = 'read' WHERE username = ? AND status = 'unread'`;
        await db.query(query, [username]);
    } catch (error) {
        console.error("Error marking notifications as read:", error);
        throw error;
    }
};

module.exports = { createNotification, getUserNotifications, markNotificationsAsRead };
