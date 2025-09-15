import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name:'post',
    initialState:{
        posts: []
    },
    reducers:{
        clean: (state) => { state.posts = []; },
        setPosts: (state, action) => {
            state.posts = action.payload;
        }
    },
});

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;