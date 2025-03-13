import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    search: builder.query({
      query: (title) => `search?title=${encodeURIComponent(title)}`, // Encode search term
      transformResponse: (response) => response || [], // Ensure valid response
    }),
  }),
});

export const { useSearchQuery } = searchApi;
