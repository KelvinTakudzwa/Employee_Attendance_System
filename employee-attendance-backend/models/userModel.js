const db = require('../config/db');

// Add a new user
const addUser = async (fullname, username, email, hashedPassword, role) => {
  const query = 'INSERT INTO users (fullname, username, email, password, role) VALUES (?, ?, ?, ?, ?)';
  try {
    const [result] = await db.query(query, [fullname, username, email, hashedPassword, role]);
    return result.insertId;
  } catch (err) {
    throw err;
  }
};

// Update user by username
const updateUserByUsername = async (username, updateFields) => {
  if (Object.keys(updateFields).length === 0) {
    throw new Error("No fields provided for update.");
  }

  const fields = Object.keys(updateFields).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updateFields);

  const query = `UPDATE users SET ${fields} WHERE username = ?`;
  try {
    const [result] = await db.query(query, [...values, username]);
    return result.affectedRows;
  } catch (err) {
    throw err;
  }
};

module.exports = { addUser, updateUserByUsername };
