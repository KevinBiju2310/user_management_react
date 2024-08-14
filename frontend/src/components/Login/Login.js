import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Login.css";
import { signIn, signUp } from "../../slices/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (signState === "Sign Up" && !name.trim()) {
      errors.name = "Username is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (signState === "Sign Up") {
      if (!confirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
      } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (signState === "Sign Up") {
        try {
          const response = await axios.post(
            "http://localhost:5000/user/signup",
            {
              name,
              email,
              password,
            }
          );
          console.log("SignUp Message:", response.data.message);
          dispatch(signUp({ name, email, password }));
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setSignState("Sign In");
          setServerError("");
        } catch (error) {
          console.error("Error signing up:", error);
          setServerError(error.response?.data?.message);
        }
      } else {
        try {
          const response = await axios.post(
            "http://localhost:5000/user/signin",
            {
              email,
              password,
            }
          );
          localStorage.setItem("authToken", response.data.token);
          console.log(response.data.token);
          console.log("SignIn Message: ", response.data.message);
          const { name, profileImage, isAdmin } = response.data.user;
          if (isAdmin) {
            dispatch(signIn({ name, email, profileImage, isAdmin }));
            navigate("/admin-dashboard");
          } else {
            dispatch(signIn({ name, email, profileImage }));
            setEmail("");
            setPassword("");
            navigate("/home");
            setServerError("");
          }
        } catch (error) {
          console.error("Error signing in:", error);
          setServerError(error.response?.data?.message);
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h1 className="heading">{signState}</h1>
        {serverError && <p className="error">{serverError}</p>}
        <form className="form" onSubmit={handleSubmit} noValidate>
          {signState === "Sign Up" ? (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Username"
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </>
          ) : <></>}
          <>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </>
          <>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </>
          {signState === "Sign Up" ? (
            <>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}
            </>
          ) : <></>}
          <button className="button" type="submit">
            {signState}
          </button>
        </form>
        <div className="toggleContainer">
          {signState === "Sign Up" ? (
            <p className="toggleText">
              Already have an account?
              <span
                className="toggleLink"
                onClick={() => {
                  setSignState("Sign In");
                }}
              >
                SignIn
              </span>
            </p>
          ) : (
            <p className="toggleText">
              Don't have an account?
              <span
                className="toggleLink"
                onClick={() => {
                  setSignState("Sign Up");
                }}
              >
                SignUp
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
