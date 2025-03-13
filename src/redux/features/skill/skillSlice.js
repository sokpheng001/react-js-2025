import { apiSlice } from "../../../api/apiSlice";

export const skillSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allSkill: builder.query({
      query: () => `/skills/`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allReading: builder.query({
      query: () => `/skills/skill_name=reading/level=a1`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allReadingA2Query: builder.query({
      query: () => `/skills/skill_name=reading/level=a2`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allReadingB1Query: builder.query({
      query: () => `/skills/skill_name=reading/level=b1`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allReadingB2Query: builder.query({
      query: () => `/skills/skill_name=reading/level=b2`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allListeningA1Query: builder.query({
      query: () => `/skills/skill_name=listening/level=a1`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allListeningA2Query: builder.query({
      query: () => `/skills/skill_name=listening/level=a2`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allListeningB1Query: builder.query({
      query: () => `/skills/skill_name=listening/level=b1`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allWritingA1Query: builder.query({
      query: () => `/skills/skill_name=writing/level=a1`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
    allSpeakingA1Query: builder.query({
      query: () => `/skills/skill_name=speaking/level=a1`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
  }),
});

export const {
  useAllSkillQuery,
  useAllReadingQuery,
  useAllReadingA2QueryQuery,
  useAllReadingB1QueryQuery,
  useAllReadingB2QueryQuery,
  useAllListeningA1QueryQuery,
  useAllListeningA2QueryQuery,
  useAllListeningB1QueryQuery,
  useAllWritingA1QueryQuery,
  useAllSpeakingA1QueryQuery,
} = skillSlice;
