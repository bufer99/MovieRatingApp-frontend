import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { Movie, Review, User } from '../types';
import { logout } from "./authSlice";

const BASE_URL = "http://127.0.0.1:8000/api";



const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }: any) => {
        headers.set('Accept', 'application/json');
        const token = getState().auth.token;
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers
    }
});


const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    console.log("REAUTH")
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        console.log("EXP")
        api.dispatch(logout())

    }
    return result
}


export interface Reviews {
    reviews: Array<Review>
}

export interface Users {
    users: Array<User>
}

export interface Movies {
    movies: Array<Movie>
}

const userSessionApiSlice = createApi({
    reducerPath: "userMovieApi",
    baseQuery: baseQueryWithReauth,
    refetchOnMountOrArgChange: true,
    endpoints: (build) => ({
        getUserReviews: build.query<Reviews, void>({
            query: () => ({ url: 'review' })
        }),
        getUsers: build.query<Users, void>({
            query: () => ({ url: 'users' })
        }),
        getMovies: build.query<Movies, void>({
            query: () => ({ url: 'movies' })
        }),
        getReviews: build.query<Reviews, void>({
            query: () => ({ url: 'reviews' })
        }),
        createReview: build.mutation<Review, Review>({
            query: ({ id, ...patch }) => ({
                url: `/review`,
                method: 'POST',
                body: patch,
            }),
        }),
        getReviewByMovieID: build.query<{ status: number, review: Review }, number>({
            query: (id) => ({ url: `review/${id}` })
        })
    }),

});

export const {
    useLazyGetUserReviewsQuery,
    useGetUserReviewsQuery,
    useGetReviewsQuery,
    useGetReviewByMovieIDQuery,
    useLazyGetReviewByMovieIDQuery,
    useCreateReviewMutation,
    useGetUsersQuery,
    useGetMoviesQuery
} = userSessionApiSlice;

export default userSessionApiSlice;