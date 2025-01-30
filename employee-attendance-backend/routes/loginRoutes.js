const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");



// Login Route
router.post('/', loginController.handleLogin);


module.exports = router;
