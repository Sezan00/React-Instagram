import axios from "axios";



export const profileIageDelete = () => {
    const token = localStorage.getItem("token");

    try{
        const response = axios.delete("http://localhost:8000/api/profile-image",{
                headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to remove profile image:", error);
        throw error;
    }
}