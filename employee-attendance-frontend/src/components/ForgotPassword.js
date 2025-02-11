import React, { useState } from "react";
import { Input, Button, message, Card } from "antd";
import axios from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      await axios.post("/api/forgot-password", { email });
      message.success("Reset link sent to your email.");
    } catch (error) {
      message.error("User not found.");
    }
    setLoading(false);
  };

  return (
    <Card title="Forgot Password">
      <Input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="primary" onClick={handleForgotPassword} loading={loading}>
        Send Reset Link
      </Button>
    </Card>
  );
}

export default ForgotPassword;
