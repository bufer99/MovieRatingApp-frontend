import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { Movie, Review, ReviewWithUser, User } from '../types';
import { logout } from "./authSlice";

const BASE_URL = process.env.REACT_APP_API_URL;



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
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        api.dispatch(logout())
    }
    return result
}


export interface Reviews {
    reviews: Array<ReviewWithUser>
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