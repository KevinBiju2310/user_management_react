import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
