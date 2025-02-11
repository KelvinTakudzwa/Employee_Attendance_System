const express = require('express');
const router = express.Router();
const { addUserController, updateUserController } = require('../controllers/userController');
// const { updateUserController } = require('../models/userModel');

// Route to add a new user
router.post('/add', addUserController);
router.put('/update', updateUserController);

module.exports = router;
