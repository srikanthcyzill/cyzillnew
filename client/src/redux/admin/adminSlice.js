import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentAdmin: null,
    error: null,
    loading: false,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentAdmin = action.payload;
            state.error = null;
            localStorage.setItem('token', action.payload.token);
        },

        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.currentAdmin = null;
            localStorage.removeItem('token');
        },

    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = adminSlice.actions;

export default adminSlice.reducer;
