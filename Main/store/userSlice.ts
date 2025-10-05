import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  username: "",      //
  email: "",
  genre: "",         //
  profileImage: "",  //
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
