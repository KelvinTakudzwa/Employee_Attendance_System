const { createNotification } = require("./models/notificationModel");
const { sendNotification } = require("./server");

// Simulate a missed check-in for a user
const testMissedCheckin = async () => {
    const username = "ceewy";  // Replace with a real username from your database
    const message = "You missed your check-in today!";
    const type = "checkin_reminder";

    try {
        await createNotification(username, message, type);
        sendNotification(username, message, type);
        console.log("✅ Test notification sent!");
    } catch (error) {
        console.error("❌ Error sending test notification:", error);
    }
};

// Run the test
testMissedCheckin();
