import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getSignup} from "../auth/authAPI"


export const signup  = createAsyncThunk('auth/signup',
    async()=> {
        const signup = await getSignup();
        return signup;
    }
);

const authSlice = createSlice({
    name:'auth',
    initialState:{user:null, status:"idle", error:null},
    reducers:{
        logout: (state) => { state.user = null; },
    }, 
    extraReducers:(builder) => {
        builder
          .addCase(signup.pending, (state)=> {state.action = "loading"; state.error =null;})
          .addCase(signup.fulfilled, (state, action)=>{state.status = "success"; state.user = action.payload;})
          .addCase(signup.rejected, (state, action)=>{state.status ='failed'; state.error = action.error.message;});
        
    },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;