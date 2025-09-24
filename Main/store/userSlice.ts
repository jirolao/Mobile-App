import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  profileImage: "", // Ready for future upload
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
