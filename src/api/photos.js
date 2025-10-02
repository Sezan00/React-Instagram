import axios from "axios";

const token = localStorage.getItem("token");

export const uploadPhotos = async (formData) => {
  try {
    const res = await axios.post("http://localhost:8000/api/photos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const fetchPost = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/photos", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
