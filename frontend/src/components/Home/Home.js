import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../slices/authSlice";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <div className="home-container">
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout} className="logout-button">
        LogOut
      </button>
    </div>
  );
};

export default Home;
