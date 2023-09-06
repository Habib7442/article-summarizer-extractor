import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// const rapidApiKey = import.meta.env.VITE_API_KEY;

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({baseUrl: `https://article-extractor-and-summarizer.p.rapidapi.com/`,
    prepareHeaders: (headers) => {
        headers.set("X-RapidAPI-Key", import.meta.env.VITE_API_KEY);
        headers.set("X-RapidAPI-Host", "article-extractor-and-summarizer.p.rapidapi.com");
        return headers;
    }
}),
    endpoints : (builder) => ({
        getSummary : builder.query({
            query : (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=${params.length}`
        }),
        extractContent: builder.query({
            query: (params) => `/extract?url=${encodeURIComponent(params.articleUrl)}`
        })
    })
});

export const {useLazyGetSummaryQuery, useLazyExtractContentQuery } = articleApi;