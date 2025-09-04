import axios from "axios";


export const getSignup = async ({ email, password, full_name, username }) => {
    try {
        await axios.get("/sanctum/csrf-cookie");
        const { data } = await axios.post("http://127.0.0.1:8000/api/register", {
            email, password, full_name, username
        });
        return data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw error;
    }
};