import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie } from '../types';
const BASE_URL = "localhost";

interface MovieResponse {
    "page": number,
    "results": Array<Movie>
}

const userMovieApiSlice = createApi({
    reducerPath: "userMovieApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }:any) => {
            const token = getState().auth.token;
            if (token) headers.set('authorization', `Bearer ${token.auth.token}`)
            return headers
        }
    }),
    endpoints: (build) => ({
        getUserReviews: build.query<MovieResponse, void>({
            query: () => ({ url: `movie?query=` })
        }),
    }),
});

export const { useLazyGetUserReviewsQuery, useGetUserReviewsQuery } = userMovieApiSlice;

export default userMovieApiSlice;