const socketIo = require("socket.io");

let io;

const initializeSocket = (server) => {
    io = socketIo(server, {
        cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
        console.log("🔌 New client connected");

        socket.on("disconnect", () => {
            console.log("❌ Client disconnected");
        });
    });
};

const sendNotification = (username, message, type) => {
    if (io) {
        io.emit(`notification-${username}`, { message, type });
    } else {
        console.error("❌ WebSocket (io) is not initialized!");
    }
};

module.exports = { initializeSocket, sendNotification };
