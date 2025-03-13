import { apiSlice } from "../../../api/apiSlice";

export const grammarSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allGrammar: builder.query({
      query: () => `/grammars/`,
      method: "GET",
      transformResponse: (response) => response.payload,
    }),
  }),
});

export const { useAllGrammarQuery } = grammarSlice;
