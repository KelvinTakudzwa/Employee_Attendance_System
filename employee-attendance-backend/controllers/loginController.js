const loginModel = require("../models/loginModel");
const jwt = require("jsonwebtoken");

// Controller for handling login
const handleLogin = async (req, res) => {
  console.log("Login request received:", req.body);
  // return res.json({ message: "Login request received" });

  const { username, password } = req.body;

  try {
    // Authenticate user
    const user = await loginModel.authenticateUser(username, password);
    console.log("User authentication result:", user); // Debugging

    if (user) {
      console.log("User role:", user.role); // Debugging

      if (user.role === "admin" || user.role === "employee") {
        // Generate JWT token
        const token = jwt.sign(
          {
            employee_id: user.employee_id,
            username: user.username,
            role: user.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRATION }
        );

        console.log("Generated Token:", token); // Debugging

        res.json({ token, role: user.role, message: "Login successful!" });
      } else {
        console.log("Invalid role detected."); // Debugging
        res.status(403).json({ message: "Invalid role. Access denied." });
      }
    } else {
      console.log("Invalid username or password."); // Debugging
      res.status(401).json({ message: "Invalid username or password." });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


module.exports = { handleLogin };
