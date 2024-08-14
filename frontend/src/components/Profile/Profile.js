import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../slices/authSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!file) {
      setError("Please select a file");
      return false;
    }
    if (!allowedTypes.includes(file.type)) {
      setError("Only JPEG, PNG and JPG files are allowed");
      return false;
    }

    setError("");
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (validateFile(file)) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }
    if (selectedFile) {
      const formData = new FormData();
      formData.append("profileImage", selectedFile);
      formData.append("email", user.email);
      console.log(formData);
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(
          "http://localhost:5000/user/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.message);
        dispatch(signIn(response.data.user));
        navigate("/home");
      } catch (error) {
        console.error("Error Uploading file", error);
      }
    }
  };
  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile</h2>
        <input type="file" onChange={handleFileChange} />
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleUpload} className="upload-button">
          Upload Profile Image
        </button>
      </div>
    </div>
  );
};

export default Profile;
