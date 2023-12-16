import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: null,
  lastName: null,
  email: null,
  accountType: null,
  barbers: null,
  clients: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      console.log(action.payload);
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.accountType = action.payload.accountType;
      state.barbers = action.payload?.barbers;
      state.clients = action.payload?.clients;
    },
    signOut: (state) => {
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.accountType = null;
      state.barbers = null;
      state.clients = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
