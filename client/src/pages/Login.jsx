
import "./Login.css";

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

  const features = [
    {
      icon: <FaUsers />,
      title: "Client",
      subtitle: "Management",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Payment",
      subtitle: "Tracking",
    },
    {
      icon: <FaTasks />,
      title: "Task",
      subtitle: "Management",
    },
    {
      icon: <FaChartLine />,
      title: "Growth",
      subtitle: "Analytics",
    },
  ];

  return (
    <div className="login-page">

      <div className="login-container">

        {/* LEFT SECTION */}

        <motion.div
          className="left-side"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >

          <div className="brand-content">

            <h4>WELCOME TO</h4>

            <h1>
              Vinfluence
              <span> CRM</span>
            </h1>

            <p>
              Manage your clients, projects, payments
              and your team from one beautiful dashboard.
            </p>

          </div>

          {/* FEATURE CARDS */}

          <div className="feature-box">

            {features.map((feature, index) => (
              <motion.div
                className="feature"
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + index * 0.12,
                }}
              >

                <div className="feature-icon">
                  {feature.icon}
                </div>

                <div>
                  <h5>{feature.title}</h5>
                  <small>{feature.subtitle}</small>
                </div>

              </motion.div>
            ))}

          </div>

          <div className="brand-footer">
            <span>VINFLUENCE CRM</span>
            <span>Grow Faster. Manage Smarter.</span>
          </div>

        </motion.div>

        {/* RIGHT SECTION */}

        <motion.div
          className="login-card"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >

          <div className="login-heading">
            <h2>Welcome Back 👋</h2>
            <p>Please login to continue</p>
          </div>

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
                role="button"
                tabIndex={0}
                aria-label="Toggle password visibility"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
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

          <div className="login-footer">
            Secure Access • Vinfluence Media
          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default Login;
