import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLogin } from "./loginAPI";

export const login = createAsyncThunk(
  'auth/login',
  async (userData) => {
    const response = await getLogin(userData);
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle', error: null, token: null },
  reducers: {
    logout: (state) => { state.user = null; state.token = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
