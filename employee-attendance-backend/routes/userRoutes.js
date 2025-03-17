const express = require('express');
const router = express.Router();
const { addUserController, updateUserController, deleteUserController } = require('../controllers/userController');
// const { updateUserController } = require('../models/userModel');

// Route to add a new user
router.post('/add', addUserController);
router.put('/update', updateUserController);
router.delete('/delete/:username',deleteUserController)

module.exports = router;
