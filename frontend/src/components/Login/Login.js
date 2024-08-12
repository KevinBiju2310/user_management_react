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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signState === "Sign Up") {
      try {
        const response = await axios.post("http://localhost:5000/user/signup", {
          name,
          email,
          password,
        });
        console.log("SignUp Message:", response.data.message);
        dispatch(signUp({ name, email, password }));
        setName("");
        setEmail("");
        setPassword("");
        setSignState("Sign In");
      } catch (error) {
        console.error("Error signing up:", error);
      }
    } else {
      try {
        const response = await axios.post("http://localhost:5000/user/signin", {
          email,
          password,
        });
        console.log("SignIn Message: ", response.data.message);
        const { name, profileImage, isAdmin } = response.data.user;
        if (isAdmin) {
          navigate("/admin-dashboard")
        } else {
          dispatch(signIn({ name, email, profileImage }));
          setEmail("");
          setPassword("");
          navigate("/home");
        }
      } catch (error) {
        console.error("Error signing in:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h1 className="heading">{signState}</h1>
        <form className="form" onSubmit={handleSubmit}>
          {signState === "Sign Up" ? (
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Username"
            />
          ) : (
            <></>
          )}
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
          <button className="button" type="submit">
            {signState}
          </button>
        </form>
        <div className="toggleContainer">
          {signState === "Sign Up" ? (
            <p className="toggleText">
              Already have account?
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
              Don't have account?
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
