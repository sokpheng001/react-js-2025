import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from "../lib/secureLocalStorage";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchUserData: builder.query({
      query: () => "/users/me",
      transformResponse: (response) => response.payload,
    }),
    updateUserInfo: builder.mutation({
      query: ({ user_uuid, user_name, profile, bio }) => ({
        url: `/users/${user_uuid}`, // Use user_uuid passed in the function
        method: "PUT",
        body: { user_name, profile, bio },
      }),
    }),
    uploadFile: builder.mutation({
      query: (formData) => ({
        url: "/files",
        method: "POST",
        body: formData,
        // Headers are automatically set by prepareHeaders
      }),
    }),
  }),
});

export const {
  useFetchUserDataQuery,
  useUpdateUserInfoMutation,
  useUploadFileMutation,
} = userApi;
