import { apiSlice } from "../../../api/apiSlice";

export const vocabulariesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allVocabularies: builder.query({
      query: () => `/vocabularies/`,
      method: "GET",
      transformErrorResponseK: (response) => response.payloard,
    }),
  }),
});

export const { useAllVocabulariesQuery } = vocabulariesSlice;
