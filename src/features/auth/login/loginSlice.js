import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLogin } from "./loginAPI";

const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials) =>{
    const response = await getLogin(credentials);
    return response;
  }
);

const loginSlice = createSlice({
  name:"login",
  initialState,
  reducers:{
    logout:(state) =>{
      state.user = null;
      state.token = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },

  extraReducers:(builder) => {
    builder.addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      }) 
      .addCase(login.fulfilled, (state, action)=> {
        state.status = "success";
        state.user = action.payload.user;
        state.token = action.payload.token;
        console.log(action.payload.user);
        
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action)=> {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {logout} = loginSlice.actions;
export default loginSlice.reducer;