const express = require('express');
const { addEmployee, getEmployees } = require('../controllers/employeeController');

const router = express.Router();

router.post('/', addEmployee); // Add new employee
router.get('/', getEmployees); // Get all employees

module.exports = router;
