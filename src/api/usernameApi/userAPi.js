
//__it's coming from UserController and it's Auth::user and its's fetch user profile with all details

import axios from "axios";

const API_BASE = "http://localhost:8000/api";

export async function fetchUserByUsername(username) {
  const token = localStorage.getItem("token"); 
  const res = await axios.get(`${API_BASE}/profile/${username}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
  
}

export async function fetchCurrentUser() {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_BASE}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

