import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from "../../../lib/secureLocalStorage";

// Create the API service using RTK Query
export const exerciseApi = createApi({
  reducerPath: "exerciseApi", // Unique key for the reducer
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }), // Base URL for all endpoints
  endpoints: (builder) => ({
    // Fetch all submitted exercises for a user
    fetchSubmitExercises: builder.query({
      query: (user_uuid) => `/exercise/submit_answer/user?id=${user_uuid}`,
      transformResponse: (response) => response.payload, // Transform the response
    }),
    // Fetch submitted exercises by level for a user
    fetchSubmitExercisesByLevel: builder.query({
      query: ({ user_uuid, level }) =>
        `/exercise/submit_answer/userId=${user_uuid}/level=${level}`,
      transformResponse: (response) => response.payload, // Transform the response
    }),
  }),
});

// Export hooks for usage in components
export const {
  useFetchSubmitExercisesQuery,
  useFetchSubmitExercisesByLevelQuery,
} = exerciseApi;
