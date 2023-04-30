import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "redux/thunks/user.thunks";
import { IUserSlice } from "utils/types";

const initialState: IUserSlice = {
  user: null,
  isLoading: true,
  success: true
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsernameQuery: (state, action) => {
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
      state.success = false;

    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.user = action.payload;
    });

  },
});

export { getUser };
export default usersSlice.reducer;
