import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toggleFollow } from "../../api/userFollowApi/userFollow";

// Toggle follow/unfollow
export const followToggle = createAsyncThunk(
  "follow/toggle",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await toggleFollow(userId);
      return response.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);



const followSlice = createSlice({
  name: "follow",
  initialState: {
    followersCount: 0,
    followingsCount: 0,
    isFollowing: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // toggle follow
      .addCase(followToggle.pending, (state) => {
        state.loading = true;
      })
      .addCase(followToggle.fulfilled, (state, action) => {
        state.loading = false;
        state.followersCount = action.payload.followers_count;
        state.followingsCount = action.payload.followings_count;
        state.isFollowing = action.payload.is_following;
      })
      .addCase(followToggle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default followSlice.reducer;
