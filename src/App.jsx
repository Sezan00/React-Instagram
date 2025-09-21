import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProtectedRoute from "./component/ProtectedRoute";
import UserProfile from "./pages/UserProfile";
function App() {
  return (
    <Routes>
     
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile/:username" element={<UserProfile />}/>
    </Routes>
  );
}

export default App;
