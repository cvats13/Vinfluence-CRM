import "./Login.css";

import illustration from "../assets/illustration.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaChartLine,
  FaMoneyBillWave,
  FaTasks,
  FaUsers,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "vinfluence.mediaa@gmail.com" &&
      password === "Lordvin@2"
    ) {
      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* LEFT SECTION */}

        <motion.div
          className="left-side"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >

          

          <h4>Welcome to</h4>

          <h1>
            Vinfluence <span>CRM</span>
          </h1>

          <p>
            Manage your clients, projects,
            payments and your team from one
            beautiful dashboard.
          </p>
          <img
  src={illustration}
  alt="CRM Illustration"
  className="hero-image"
/>

          <div className="feature-box">

            <div className="feature">
              <FaUsers size={28} />

              <div>
                <h5>Client</h5>
                <small>Management</small>
              </div>
            </div>

            <div className="feature">
              <FaMoneyBillWave size={28} />

              <div>
                <h5>Payment</h5>
                <small>Tracking</small>
              </div>
            </div>

            <div className="feature">
              <FaTasks size={28} />

              <div>
                <h5>Task</h5>
                <small>Management</small>
              </div>
            </div>

            <div className="feature">
              <FaChartLine size={28} />

              <div>
                <h5>Growth</h5>
                <small>Analytics</small>
              </div>
            </div>

          </div>

        </motion.div>

        {/* RIGHT SECTION */}

        <motion.div
          className="login-card"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >

          <h2>Welcome Back 👋</h2>

          <p>Please login to continue</p>

          <form onSubmit={handleLogin}>

            <div className="input-box">

              <FaEnvelope className="icon" />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>

            <div className="input-box">

              <FaLock className="icon" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <span
                className="eye"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </span>

            </div>

            <div className="remember">

              <label>
                <input type="checkbox" />
                Remember Me
              </label>

              <a href="#">
                Forgot Password?
              </a>

            </div>

            <button
              type="submit"
              className="login-btn"
            >
              Login
              <FaArrowRight />
            </button>

          </form>

        </motion.div>

      </div>

    </div>
  );
}

export default Login;