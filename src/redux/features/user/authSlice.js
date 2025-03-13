import { createSlice } from "@reduxjs/toolkit";

// Load user and token from localStorage if available
const initialState = {
  isLoginIn: !!localStorage.getItem("access_token"), // Set based on token presence
  token: localStorage.getItem("access_token") || null, // Optionally track token in state
  user: JSON.parse(localStorage.getItem("user")) || null, // Load user from localStorage
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoginIn = true;
      state.user = action.payload.user; // Set user data when logging in
      state.token = action.payload.token; // Store token
      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("access_token", action.payload.token);
    },
    logout: (state) => {
      state.isLoginIn = false;
      state.user = null;
      state.token = null;
      // Remove from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      // Update localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("access_token", action.payload.token);
    },
    updateUser: (state, action) => {
      state.user = action.payload; // Update the user information
      localStorage.setItem("user", JSON.stringify(action.payload)); // Update localStorage
    },
  },
});

export const { login, logout, setUser, updateUser } = authSlice.actions;

// Selectors
export const selectIsLoginIn = (state) => state.auth.isLoginIn;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token; // Optional: to access the token directly

export default authSlice.reducer;
