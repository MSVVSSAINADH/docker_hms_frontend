import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, MapPin } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import "./Signup.css";

const useStatusMessage = () => {
  const [message, setMessage] = useState({ text: "", type: "" });
  const showMessage = (text, type = "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  };
  return [message, showMessage];
};

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [iconFade, setIconFade] = useState(false);
  const navigate = useNavigate();
  const [statusMessage, showStatusMessage] = useStatusMessage();
  const { login } = useContext(AuthContext);

  const handleRoleChange = (e) => {
    setIconFade(true);
    setRole(e.target.value);
    setTimeout(() => setIconFade(false), 200); // fade animation duration
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!role) {
      showStatusMessage("Please select a role.", "error");
      return;
    }

    if (password !== confirmPassword) {
      showStatusMessage("Passwords do not match.", "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:8086/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          mobile,
          address,
          role,
        }),
      });

      const data = await res.json();
      showStatusMessage(
        data.message || "Something went wrong",
        res.ok ? "success" : "error"
      );

      if (res.ok) {
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setMobile("");
        setAddress("");
        setRole("");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      console.error(err);
      showStatusMessage("Server error. Please try again.", "error");
    }
  };

  const isFormValid =
    fullName && email && password && confirmPassword && mobile && address && role;

  const roleIconSVG =
    role === "doctor"
      ? `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23555" viewBox="0 0 24 24"><path d="M21 7h-2V5a2 2 0 00-2-2h-1a1 1 0 100 2h1v2h-2V5a1 1 0 10-2 0v2h-2V5a1 1 0 10-2 0v2H7V5a1 1 0 10-2 0v2H3v14h18V7zM8 17a2 2 0 110-4 2 2 0 010 4zm8 0a2 2 0 110-4 2 2 0 010 4z"/></svg>')`
      : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23555" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>')`;

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>Create Your Account</h2>
          <p className="signup-link">
            Already a member? <a href="/login">Sign in</a>
          </p>
        </div>

        {statusMessage.text && (
          <div className={`status-message ${statusMessage.type}`}>
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSignup}>
          {/* Full Name */}
          <div className="input-group">
            <label>Full Name</label>
            <div className="input-with-icon">
              <User className="icon user-icon" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <div className="input-with-icon">
              <Mail className="icon email-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@example.com"
              />
            </div>
          </div>

          {/* Mobile */}
          <div className="input-group">
            <label>Mobile</label>
            <div className="input-with-icon">
              <Phone className="icon phone-icon" />
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                placeholder="Enter your mobile number"
              />
            </div>
          </div>

          {/* Address */}
          <div className="input-group">
            <label>Address</label>
            <div className="input-with-icon">
              <MapPin className="icon map-icon" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Enter your address"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="input-group">
            <label>Role</label>
            <div className="input-with-icon">
              <span
                className={`icon role-icon ${iconFade ? "fade" : ""}`}
                style={{ backgroundImage: roleIconSVG }}
              ></span>
              <select
                value={role}
                onChange={handleRoleChange}
                required
                className="role-dropdown"
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock className="icon lock-icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Choose a strong password"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label>Confirm Password</label>
            <div className="input-with-icon">
              <Lock className="icon lock-icon" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Re-enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className="login-button"
          >
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
