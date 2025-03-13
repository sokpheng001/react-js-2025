// src/services/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (email) => ({
        url: `/request/reset-password?email=${email}`, // Ensure email is just the string
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure JSON content type
        },
        body: { email }, // Send the email in the body, if needed
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/request/reset-password/otp-verify",
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure the content type is JSON
        },
        body: { email, otp },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ email, new_password, confirm_password }) => ({
        url: "/reset-password", // URL for the reset password endpoint
        method: "POST",
        body: { email, new_password, confirm_password }, // Include email in the body
        headers: {
          "Content-Type": "application/json", // Ensure JSON content type
        },
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    updateUserInfo: builder.mutation({
      query: ({ user_uuid, token, user_name, profile, bio }) => ({
        url: `/users/${user_uuid}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: { user_name, profile, bio },
      }),
    }),
    uploadFile: builder.mutation({
      query: (file) => ({
        url: "/files",
        method: "POST",
        body: file,
      }),
    }),
    userVerify: builder.mutation({
      query: (token) => ({
        url: "/users/me",
        method: "POST",
        body: token,
      }),
    }),
    getUser: builder.query({
      query: () => "/users", // Endpoint to fetch user data
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useVerifyEmailMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useLoginUserMutation,
  useUpdateUserInfoMutation,
  useUploadFileMutation,
  useUserVerifyMutation,
  useGetUserQuery
} = api;
