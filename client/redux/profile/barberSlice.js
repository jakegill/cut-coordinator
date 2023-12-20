import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profilePicture: "",
  location: {
    address: "",
    city: "",
    state: "",
  },
  services: [],
  schedule: {
    days: {
      Sunday: false,
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
    },
    startTime: "",
    endTime: "",
  },
  portfolio: [],
};

export const barberProfileSlice = createSlice({
  name: "barberProfile",
  initialState,
  reducers: {
    setBarberProfile: (state, action) => {
      console.log("Action received in reducer: ", action);
      state.location = action.payload.location;
      state.services = action.payload.services;
      state.schedule = action.payload.schedule;
      state.portfolio = action.payload.portfolio;
      state.profilePicture = action.payload.profilePicture;
    },
  },
});

export const { setBarberProfile } = barberProfileSlice.actions;

export default barberProfileSlice.reducer;
