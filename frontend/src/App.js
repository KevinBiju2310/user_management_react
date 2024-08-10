import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Admin from "./components/Admin/Admin";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/edit-profile" element={<Profile />} />
        <Route path="/admin-dashboard" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
