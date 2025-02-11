import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import EmployeeDashboard from "./components/employeeDashboard";
import AdminDashboard from "./components/adminDashboard";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path ="forgot-password" element={<ForgotPassword />}></Route>
        <Route path ="reset-password" element={<ResetPassword />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
