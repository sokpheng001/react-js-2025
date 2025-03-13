import { apiSlice } from "../../../api/apiSlice";

export const speakingSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
	allSpeaking: builder.query({
	  // ✅ Use the correct name
	  query: () => ({
		url: `/skills/speaking`,
		method: "GET",
	  }),
	}),
  }),
});

export const { useAllSpeakingQuery } = speakingSlice;