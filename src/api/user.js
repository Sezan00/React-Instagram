import axios from "axios";



export const fetchUser = async () => {
    const token = localStorage.getItem("token");

    try{
        const response = await axios.get("http://localhost:8000/api/user", {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch erro:", error);
        throw error;
    }
}