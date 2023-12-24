import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profilePicture: "",
  barbers: [], //emails
};

export const clientProfileSlice = createSlice({
  name: "clientProfile",
  initialState,
  reducers: {
    setClientProfile: (state, action) => {
      state.barbers = action.payload.barbers;
      state.profilePicture = action.payload.profilePicture;
    },
  },
});

export const { setClientProfile } = clientProfileSlice.actions;

export default clientProfileSlice.reducer;
