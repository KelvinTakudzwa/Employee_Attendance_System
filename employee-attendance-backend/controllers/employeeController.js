const connection = require('../config/db');

exports.addEmployee = (req, res) => {
  const { name, email, position } = req.body;
  const sql = 'INSERT INTO employees (name, email, position) VALUES (?, ?, ?)';
  connection.query(sql, [name, email, position], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Employee added successfully', employeeId: result.insertId });
    }
  });
};

exports.getEmployees = (req, res) => {
  const sql = 'SELECT * FROM employees';
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};
