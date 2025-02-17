import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "../services/api";
import "../styles/LoginPage.css"; 
// import backgroundImage from "../assets/background2.png";
// import ParticlesBackground from "./ParticlesBackground";

const { Title, Text } = Typography;

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const backgroundStyle = {
  //   backgroundImage: `url(${backgroundImage})`,
  //   backgroundSize: "content",
  //   backgroundPosition: "center",
  //   backgroundRepeat: "no-repeat",
  //   height: "100vh",
  //   width: "100vw",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#f4f4f4",
  //   // height: "100vh", // Ensures full screen
  // };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/login", { username, password });
      const { role, token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (role === "admin") navigate("/admin-dashboard", { state: { username } });
      else if (role === "employee") navigate("/employee-dashboard", { state: { username } });
      else message.error("Invalid role!");
    } catch (err) {
      message.error("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" /*style={backgroundStyle}*/>
      {/* <ParticlesBackground /> */}
      <Card className="login-card" bordered={false}>
        <Title level={2} className="login-title">Login</Title>

        <form onSubmit={handleLogin} className="login-form">
          <Input
            size="large"
            placeholder="Username"
            prefix={<UserOutlined />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input.Password
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Button type="primary" size="large" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </form>

        <Text type="secondary">Forgot password? <a href="/forgot-password">Reset here</a></Text>
      </Card>
    </div>
  );
}

export default LoginPage;
