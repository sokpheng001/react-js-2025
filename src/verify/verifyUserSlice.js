import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    fetchUserData: builder.mutation({
      query: (token) => ({
        url: "/users/me",
        method: "POST",
        body: { token },
      }),
    }),
    updateUserInfo: builder.mutation({
      query: ({ user_uuid, token, user_name, profile, bio }) => ({
        url: "/users/update",
        method: "POST",
        body: { user_uuid, user_name, profile, bio, token },
      }),
    }),
  }),
});

export const { useFetchUserDataMutation, useUpdateUserInfoMutation } = userApi;
