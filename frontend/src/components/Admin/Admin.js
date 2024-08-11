import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaUserPlus,
  FaSignOutAlt,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import axios from "axios";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/users");
        console.log("user-frontend", response.data.users);
        setUsers(response.data.users);
        setFilteredUsers(response.data.users);
        setTimeout(() => {
          setLoading(false);
        }, 700);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = () => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  return (
    <div className="main-container">
      <div className="header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="search users..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <button onClick={handleSearch}>
            <FaSearch /> Search
          </button>
        </div>
        <div className="actions">
          <button
            onClick={() => {
              navigate("/new-user");
            }}
          >
            {" "}
            <FaUserPlus /> Create User
          </button>
          <button>
            {" "}
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
      <div className="list-users">
        <table>
          <thead>
            <tr>
              <th>Profile Image</th>
              <th>Username</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                <tr>
                  <td colSpan="4">
                    <div className="shimmer-wrapper"></div>
                  </td>
                </tr>
                <tr>
                  <td colSpan="4">
                    <div className="shimmer-wrapper"></div>
                  </td>
                </tr>
                <tr>
                  <td colSpan="4">
                    <div className="shimmer-wrapper"></div>
                  </td>
                </tr>
              </>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <img
                      src={
                        user.profileImage
                          ? `http://localhost:5000/uploads/${user.profileImage}`
                          : "https://via.placeholder.com/50"
                      }
                      alt="Profile"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button>
                      {" "}
                      <FaEdit /> Edit
                    </button>
                    <button>
                      {" "}
                      <FaTrashAlt />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
