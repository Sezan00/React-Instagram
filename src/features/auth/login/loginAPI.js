import axios from "axios";

export const getLogin = async ({ email, password }) => {
    await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie"); 
    const { data } = await axios.post("http://127.0.0.1:8000/api/login", { email, password });
    return data;
};