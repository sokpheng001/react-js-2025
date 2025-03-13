import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the API service using RTK Query
export const exerciseApi = createApi({
  reducerPath: "exerciseApi", // Unique key for the reducer
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }), // Base URL for all endpoints
  endpoints: (builder) => ({
    // Fetch all exercises
    fetchExercises: builder.query({
      query: () => "/exercises", // Endpoint URL
      transformResponse: (response) => response.payload, // Transform the response
    }),
    // Fetch exercise by ID
    fetchExerciseById: builder.query({
      query: (ex_uuid) => `/exercises/${ex_uuid}`, // Endpoint URL with dynamic parameter
      transformResponse: (response) => response.payload, // Transform the response
    }),
  }),
});

// Export hooks for usage in components
export const { useFetchExercisesQuery, useFetchExerciseByIdQuery } =
  exerciseApi;
