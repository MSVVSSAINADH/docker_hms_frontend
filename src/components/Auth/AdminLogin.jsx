import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./AdminLogin.css";

function AdminLogin() {
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (adminId === "admin" && adminPassword === "admin123") {
      login({ email: adminId, role: "admin" });
      navigate("/admin/dashboard");
    } else {
      alert("Invalid admin credentials!");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="login-header">
          <h2>Admin Portal Login</h2>
          <p className="access-note">Access restricted to authorized personnel only.</p>
        </div>
        <form onSubmit={handleAdminLogin} className="admin-login-form">
          <div className="input-group">
            <label>Admin ID</label>
            <div className="input-with-icon">
              <span className="icon user-icon"></span>
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="input-group">
            <label>Password</label>
            <div className="input-with-icon">
              <span className="icon lock-icon"></span>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="login-button">
            Sign In to Dashboard
          </button>
          <p className="forgot-password">Forgot Password?</p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
