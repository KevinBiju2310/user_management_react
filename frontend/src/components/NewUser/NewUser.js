import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./NewUser.module.css"; 

const NewUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profileImage", profileImage);

      const token = localStorage.getItem("authToken")
      await axios.post("http://localhost:5000/admin/newuser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:`Bearer ${token}`
        },
      });

      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error creating user:", error.response.data.message);
    }
  };

  return (
    <div className={styles.newUserContainer}>
      <h2 className={styles.newUserTitle}>Create New User</h2>
      <form className={styles.newUserForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          className={styles.newUserInput}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          className={styles.newUserInput}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className={styles.newUserInput}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="file"
          className={styles.newUserInputFile}
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
        <button type="submit" className={styles.newUserButton}>
          Create User
        </button>
      </form>
    </div>
  );
};

export default NewUser;
