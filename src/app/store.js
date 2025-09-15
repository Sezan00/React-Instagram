import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import loginReducer from "../features/auth/login/loginSlice"
import postReducer from "../features/postSlice"

export const store = configureStore({
    reducer:{
        auth: authReducer,
        login: loginReducer,
        posts: postReducer
    }
});

export default store;