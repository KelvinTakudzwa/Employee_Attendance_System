const bcrypt = require("bcrypt");
const {
  addUser,
  updateUserByUsername,
  deleteUserByUsername,
} = require("../models/userModel");

// Add a new user
const addUserController = async (req, res) => {
  const { fullname, username, email, password, role, national_id, phone_number, department } = req.body;

  // Basic validation for required fields
  if (!fullname || !username || !email || !password || !role || !national_id || !phone_number || !department) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Call the model to insert the user
    const userId = await addUser(
      fullname,
      username,
      email,
      hashedPassword,
      role,
      national_id,
      phone_number,
      department
    );

    res.status(201).json({ message: "User added successfully", userId });
  } catch (err) {
    console.error("Error adding user:", err);

    // Check for duplicate email or username error
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    res.status(500).json({ error: "Failed to add user" });
  }
};

// Update user information
const updateUserController = async (req, res) => {
  const { username, ...updateFields } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ error: "Username is required to update the user" });
  }

  if (Object.keys(updateFields).length === 0) {
    return res
      .status(400)
      .json({ error: "At least one field is required for update" });
  }

  try {
    // Update the user in the database
    const affectedRows = await updateUserByUsername(username, updateFields);

    if (affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Failed to update user" });
  }

  
};
const deleteUserController = async (req, res) => {
  const { username } = req.params;

  if (!username) {
    return res
      .status(400)
      .json({ error: "Username is required to delete the user" });
  }
  try {
    const affectedRows = await deleteUserByUsername(username);

    if (affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User delete successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

module.exports = {
  addUserController,
  updateUserController,
  deleteUserController,
};
