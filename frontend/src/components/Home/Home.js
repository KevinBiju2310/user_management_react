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
  console.log(user.profileImage);
  console.log(user.name);
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  const profileImageUrl = user.profileImage
    ? `http://localhost:5000/uploads/${user.profileImage}`
    : "https://via.placeholder.com/150";

  return (
    <div className="home-container">
      <div className="card">
        <h2>Welcome to Home Page</h2>
        <img src={profileImageUrl} alt="Profile" className="profile-image" />
        <h3>Welcome, {user.name}</h3>
        <p>Email: {user.email}</p>
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
        <button onClick={handleEditProfile} className="edit-profile-button">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Home;
