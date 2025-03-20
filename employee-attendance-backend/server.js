const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const loginRoutes = require('./routes/loginRoutes');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cron = require('node-cron');
const http = require('http');
const socketIo = require("socket.io");
const { initializeSocket} = require("./utils/socket");
const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const authRoutes = require('./routes/authRoutes');
const notificationRoutes = require("./routes/notificationRoutes");
const {checkMissedCheckIns} = require("./models/attendanceModel");


const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
initializeSocket(server);
const io = socketIo(server, {
  cors: { origin: "*"}
});
io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
})
// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api', authRoutes);
app.use('/api/notifications', notificationRoutes);

io.on('connection', (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const sendNotification = (username , message , type) => {
  
  io.emit(`notification-${username}`, { message, type });
}


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  console.log("DB_HOST:", process.env.DB_HOST);
  console.log("leaveRoutes:", leaveRoutes);
});

app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on http://10.10.2.76:5000');
});

cron.schedule('0 09 * * *', async () => {
  console.log("Running missed check-in task at 09:00 AM");
  await checkMissedCheckIns();
  
})
module.exports = {app, server , sendNotification};
