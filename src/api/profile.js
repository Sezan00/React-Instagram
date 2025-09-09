import axios from "axios";

export const uploadProfileImage = async (file) => {
    const token = localStorage.getItem("token"); 
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await axios.post(
            "http://localhost:8000/api/profile-image",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            
            }
        );
        return response.data;
    } catch (error) {
        console.error("Upload failed:", error);
        throw error;
    }
};
