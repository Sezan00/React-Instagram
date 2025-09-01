import axios from "axios";


export const getSignup = async ({ username, email, password }) => {
    await axios.get("/sanctum/csrf-cookie");
    const { data } = await axios.post("/api/register", { username, email, password });
    return data;
};