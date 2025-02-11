const db = require("../config/db");
const bcrypt = require("bcrypt");

// Authenticate user
const authenticateUser = async (username, password) => {
  try {
    console.log("Checking user in database:", username);

    const query = "SELECT * FROM users WHERE username = ?";
    
    // Use `await` since `db.query` returns a promise when using `pool.promise()`
    const [results] = await db.query(query, [username]);

    console.log("Query executed successfully. Results:", results);

    if (results.length > 0) {
      const user = results[0];
      console.log("User found:", user);

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log("Password valid:", isPasswordValid);

      return isPasswordValid ? user : null;
    } else {
      console.log("User not found.");
      return null;
    }
  } catch (error) {
    console.error("Database error:", error);
    throw error; // Ensure errors are caught properly
  }
};



module.exports = { authenticateUser };
