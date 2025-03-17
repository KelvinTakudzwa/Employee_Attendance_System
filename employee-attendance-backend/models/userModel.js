const db = require('../config/db');
const crypto = require('crypto');


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

// Generate Reset Token
const generateResetToken = async (email) => {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 3600000); // 1 hour from now

  const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (!user) {
    throw new Error("User not found.");
  }

  const query = `UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE email = ? ` ;
  try {
    const [result] = await db.query(query, [token, expires, email]);
    console.log("Generate Reset Token Result: ", result);

    return result.affectedRows > 0 ? token : null;
  } catch (err) {
    throw err;
  }
};

// Verify Reset Token
const verifyResetToken = async (token) => {
  const query = `SELECT username FROM users WHERE reset_token = ? AND reset_token_expires > NOW()`;
  try {
    const [rows] = await db.query(query, [token]);

    console.log("Verify Reset Token Result :", rows);

    return rows.length > 0 ? rows[0].username : null;
  } catch (err) {
    console.error("Errpr verifying reset token:", err);
    throw err;
  }
};

// Reset Password
const resetPassword = async (username, hashedPassword) => {
  const query = `UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE username = ?`;
  try {
    const [result] = await db.query(query, [hashedPassword, username]);
    return result.affectedRows;
  } catch (err) {
    throw err;
  }
};

const deleteUserByUsername = async (username) => {
  const query = 'DELETE FROM users WHERE username = ?';
  const [result] = await db.execute(query, [username]);
  return result.affectedRows;
};



module.exports = { addUser, updateUserByUsername, generateResetToken, verifyResetToken, resetPassword, deleteUserByUsername };
