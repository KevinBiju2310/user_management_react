import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./EditUser.module.css";

const EditUser = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:5000/admin/user/${id}`,{
            headers:{Authorization: `Bearer ${token}`}
          }
        );
        const { name, email, profileImage } = response.data.user;
        setName(name);
        setEmail(email);
        setProfileImage(profileImage);
        setPreviewImage(`http://localhost:5000/uploads/${profileImage}`);
      } catch (error) {
        console.error(
          "Error fetching user details: ",
          error.response.data.message
        );
      }
    };
    fetchUser();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }
      const token = localStorage.getItem("authToken");
      await axios.put(`http://localhost:5000/admin/user/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,

        },
      });
      navigate("/admin-dashboard");
    } catch (error) {
      console.log("Error updating user: ", error.response.data.message);
    }
  };

  return (
    <div className={classes.editUserContainer}>
      <h2 className={classes.editUserTitle}>Edit User</h2>
      <form className={classes.editUserForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          className={classes.editUserInput}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          className={classes.editUserInput}
          onChange={(e) => setEmail(e.target.value)}
        />
        {previewImage && (
          <div className={classes.editUserPreview}>
            <img src={previewImage} alt="Profile Preview" />
          </div>
        )}
        <div className={classes.editUserInputFile}>
          <input type="file" id="file-upload" onChange={handleImageChange} />
          <label htmlFor="file-upload">Choose New Profile Image</label>
        </div>
        <button type="submit" className={classes.editUserButton}>
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
