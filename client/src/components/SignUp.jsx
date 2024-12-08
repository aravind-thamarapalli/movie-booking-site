import React, { useRef, useEffect, useState } from "react";
import { GiTicket } from "react-icons/gi";
import { GoEye, GoEyeClosed } from "react-icons/go";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [state, setState] = useState("signup");
  const [passType, setPassType] = useState("password");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const cursor = useRef();
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000"; // Make sure this URL is correct for your server

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursor.current.style.left = `${e.clientX}px`;
      cursor.current.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    document.getElementById("username")?.focus();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (!/(?=.*[0-9])/.test(password) || !/(?=.*[!@#$%^&*])/.test(password)) {
      setError("Password must include a number and a special character.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/signup`, {
        userName: username,
        email,
        password,
        role: "user",
      });
      console.log("User saved:", response.data);
      setFormData({ username: "", email: "", password: "" });
      setState("login");
      setError(""); // Reset error message
    } catch (err) {
      console.error("Error during signup:", err); // Log the error for debugging
      setError(
        err?.response?.data?.message || "An error occurred during signup."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, password } = loginForm;

    if (!email || !password) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/login`, {
        email,
        password,
      });
      const { token } = response.data;

      localStorage.setItem("authToken", token);
      console.log("User logged in:", response.data);
      navigate("/Hero"); // Redirect to the hero page (or any other page)
    } catch (err) {
      console.error("Error during login:", err); // Log the error for debugging
      setError(
        err?.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const switchToSignup = () => {
    setState("signup");
    setError("");
  };

  const switchToLogin = () => {
    setState("login");
    setError("");
  };

  return (
    <>
      <div className="ticket-cursor" ref={cursor}>
        <GiTicket />
      </div>
      {state === "login" && (
        <div>
          <div className="login-bg"></div>
          <div className="login-main">
            <div className="login-panel">
              <h2>LOGIN</h2>
              {error && <p className="error-message">{error}</p>}
              <form onSubmit={handleSubmitLogin}>
                <div className="login-input">
                  <label htmlFor="email" className="login-labels">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={loginForm.email}
                    className="login-input-inputs"
                    onChange={handleLoginInputChange}
                    required
                  />
                </div>
                <div className="login-input">
                  <label htmlFor="password" className="login-labels">
                    Password
                  </label>
                  <input
                    type={passType}
                    name="password"
                    id="password"
                    value={loginForm.password}
                    className="login-input-inputs"
                    onChange={handleLoginInputChange}
                    required
                  />
                  {passType === "password" ? (
                    <GoEye
                      className="login-pass-icon"
                      onClick={() => setPassType("text")}
                    />
                  ) : (
                    <GoEyeClosed
                      className="login-pass-icon"
                      onClick={() => setPassType("password")}
                    />
                  )}
                </div>
                <button
                  className="login-btn"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </form>
              <p>
                Don't Have an Account{" "}
                <span onClick={switchToSignup}>Sign Up</span>
              </p>
            </div>
          </div>
        </div>
      )}
      {state === "signup" && (
        <div>
          <div className="signup-bg"></div>
          <div className="signup-main">
            <div className="signup-panel">
              <h2>SIGN UP</h2>
              {error && <p className="error-message">{error}</p>}
              <form onSubmit={handleSubmitSignUp}>
                <div className="signup-input">
                  <label htmlFor="username" className="signup-labels">
                    UserName
                  </label>
                  <input
                    required
                    type="text"
                    name="username"
                    id="username"
                    className="signup-input-inputs"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="signup-input">
                  <label htmlFor="email" className="signup-labels">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    className="signup-input-inputs"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="signup-input">
                  <label htmlFor="password" className="signup-labels">
                    Password
                  </label>
                  <input
                    required
                    type={passType}
                    name="password"
                    id="password"
                    className="signup-input-inputs"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {passType === "password" ? (
                    <GoEye
                      className="login-pass-icon"
                      onClick={() => setPassType("text")}
                    />
                  ) : (
                    <GoEyeClosed
                      className="login-pass-icon"
                      onClick={() => setPassType("password")}
                    />
                  )}
                </div>
                <button
                  className="signup-btn"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing up..." : "Sign Up"}
                </button>
              </form>
              <p>
                Already Have an Account{" "}
                <span onClick={switchToLogin}>Login</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
