import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Input, Button, message, Card } from "antd";
import axios from "../services/api";

function ResetPassword() {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      await axios.post("/api/reset-password", { token, newPassword });
      message.success("Password reset successful!");
    } catch (error) {
      message.error("Invalid or expired token.");
    }
    setLoading(false);
  };

  return (
    <Card title="Reset Password">
      <Input.Password
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button type="primary" onClick={handleResetPassword} loading={loading}>
        Reset Password
      </Button>
    </Card>
  );
}

export default ResetPassword;
