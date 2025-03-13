import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { getAccessToken } from "../../../lib/secureLocalStorage";

export const lessonsApi = createApi({
  reducerPath: "lessonsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    allLessons: builder.query({
      query: () => "/lessons/", // Endpoint to fetch user data
    }),
  }),
});

export const {
  useAllLessonsQuery
} = lessonsApi;
