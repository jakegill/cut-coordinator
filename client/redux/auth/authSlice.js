import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	firstName: null,
	lastName: null,
	email: null,
	accountType: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		signIn: (state, action) => {
			state.firstName = action.payload.firstName;
			state.lastName = action.payload.lastName;
			state.email = action.payload.email;
			state.accountType = action.payload.accountType;
		},
		reset: (state) => initialState,
	},
});

export const { signIn, signOut, reset } = authSlice.actions;

export default authSlice.reducer;
