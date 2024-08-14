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
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { logOut } from "../../slices/authSlice";
import Header from "../Header/Header";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log(token, "admin");
        const response = await axios.get("http://localhost:5000/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("authToken");
          await axios.delete(`http://localhost:5000/admin/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUsers(users.filter((user) => user._id !== userId));
          setFilteredUsers(filteredUsers.filter((user) => user._id !== userId));
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "There was an error deleting the user.", "error");
        }
      }
    });
  };

  return (
    <div className="page-wrapper">
      <Header />
      <div className="content-wrapper">
        <div className="main-container">
          <div className="header">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search users..."
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
              <button onClick={() => navigate("/new-user")}>
                <FaUserPlus /> Create User
              </button>
              <button
                onClick={() => {
                  dispatch(logOut());
                  navigate("/");
                }}
              >
                <FaSignOutAlt /> Logout
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
                ) : filteredUsers.length > 0 ? (
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
                        <button
                          onClick={() => navigate(`/edit-user/${user._id}`)}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button onClick={() => handleDelete(user._id)}>
                          <FaTrashAlt /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-users-message">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
