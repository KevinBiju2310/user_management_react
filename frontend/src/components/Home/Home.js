import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../slices/authSlice";
import styles from "./Home.module.css";

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
    <div className={styles.homeContainer}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <img
            src={profileImageUrl}
            alt="Profile"
            className={styles.profileImage}
          />
          <h2 className={styles.title}>{user.name}</h2>
          <h3 className={styles.subtitle}>{user.email}</h3>
        </div>
        <div className={styles.cardBody}>
          <p className={styles.description}>
            Welcome to your profile page. Here you can view and edit your
            information.
          </p>
          <button
            className={`${styles.button} ${styles.logoutButton}`}
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className={`${styles.button} ${styles.editProfileButton}`}
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
