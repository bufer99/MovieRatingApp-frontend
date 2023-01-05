import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie } from '../types';
const BASE_URL = process.env.REACT_APP_TMDB_API_URL;
const TOKEN = process.env.REACT_APP_TMDB_API_TOKEN;


interface MovieResponse {
    "page": number,
    "results": Array<Movie>
}

const movieApiSlice = createApi({
    reducerPath: "movieApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${TOKEN}`)
            return headers
        }
    }),
    endpoints: (build) => ({
        getMovies: build.query<MovieResponse, string>({
            query: (query) => ({ url: `movie?query=${query}` })
        }),
    }),
});

export const { useLazyGetMoviesQuery, useGetMoviesQuery } = movieApiSlice;

export default movieApiSlice;