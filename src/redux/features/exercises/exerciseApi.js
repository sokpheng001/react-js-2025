import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const exerciseApi = createApi({
  reducerPath: "exerciseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token")?.trim(); // Ensure token is valid
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchExercises: builder.query({
      query: () => "/exercises",
      transformResponse: (response) => response?.payload || [],
    }),
    fetchSubmitExercises: builder.query({
      query: (user_uuid) => `/exercise/submit_answer/user?id=${user_uuid}`,
      transformResponse: (response) => response?.payload || [],
    }),
    fetchSubmitExercisesByLevel: builder.query({
      query: ({ user_uuid, level }) =>
        `/exercise/submit_answer/userId=${user_uuid}/level=${level}`,
      transformResponse: (response) => response?.payload || [],
    }),
  }),
});

export const {
  useFetchExercisesQuery,
  useFetchSubmitExercisesQuery,
  useFetchSubmitExercisesByLevelQuery,
} = exerciseApi;
