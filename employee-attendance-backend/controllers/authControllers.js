const { generateResetToken, verifyResetToken, resetPassword } = require("../models/userModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// Configure email transport (Replace with real credentials)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: "takukelvin01@gmail.com", pass: "fhnyowuymyfusyde" },
});

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    console.log("forgot Password Request for:" , email);

    const token = await generateResetToken(email);
    if (!token) {
        console.log("User not found for email:", email);
        return res.status(404).json({ message: "User not found" });}


    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    console.log("Reset Link:", resetLink);

    // Send email
    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });
    res.status(200).json({ message: "Email sent successfully" });
    console.log("Email sent successfully to :", email);
    // res.json({ message: "Reset link sent to email" });
  } catch (err) {
    console.error("Error sending email:", err); 
    res.status(500).json({ error: err.message || "Error processing request" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const username = await verifyResetToken(token);
    if (!username) return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await resetPassword(username, hashedPassword);

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: "Error processing request" });
  }
};
