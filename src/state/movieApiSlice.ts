import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie } from '../types';
const BASE_URL = "https://api.themoviedb.org/3/search/";
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWMyZGFmMzM2ZWE5MjNhYzFlNTUwYTJkMDNlZTQ4MiIsInN1YiI6IjYzOGI2MzkyMGU2NGFmMDA4ODU5NTQ3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aThfidzvk5746LcUguNP-aq3xvqZcy0sDdqyJKq1iaY";


interface MovieResponse {
    "page":number,
    "results":Array<Movie>
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
        getMovies: build.query<MovieResponse,string>({
            query: (query) => ({ url: `movie?query=${query}` })
        }),
    }),
});

export const { useLazyGetMoviesQuery, useGetMoviesQuery } = movieApiSlice;

export default movieApiSlice;