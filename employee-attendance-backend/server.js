const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const loginRoutes = require('./routes/loginRoutes');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const leaveRoutes = require('./routes/leaveRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  console.log("DB_HOST:", process.env.DB_HOST);
  console.log("leaveRoutes:", leaveRoutes);
});
