import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import loginReducer from "../features/auth/login/loginSlice"

export const store = configureStore({
    reducer:{
        auth: authReducer,
        login: loginReducer
    }
});

export default store;