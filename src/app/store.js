import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import loginReducer from "../features/auth/login/loginSlice"
import postReducer from "../features/postSlice"
import followReducer from "../features/follow/followSlice"
export const store = configureStore({
    reducer:{
        auth: authReducer,
        login: loginReducer,
        posts: postReducer,
        follow: followReducer,
    }
});

export default store;