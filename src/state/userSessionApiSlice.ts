import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie, Review } from '../types';

const BASE_URL = "http://127.0.0.1:8000/api";

interface Response {
    status: number,
    reviews: Array<Review>
}

const userSessionApiSlice = createApi({
    reducerPath: "userMovieApi",
    refetchOnMountOrArgChange: 30,
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }: any) => {
            headers.set('Accept', 'application/json');
            const token = getState().auth.token;
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers
        }
    }),
    endpoints: (build) => ({
        getUserReviews: build.query<Response, void>({
            query: () => ({ url: 'review' })
        }),
        createReview: build.mutation<Review, Review>({
            query: ({ id, ...patch }) => ({
                url: `/review`,
                method: 'POST',
                body: patch,
              }),
        }),
        getReviewByMovieID: build.query<{status: number, review: Review}, number>({
            query: (id) => ({ url: `review/${id}` })
        })
    }),

});

export const {
    useLazyGetUserReviewsQuery,
    useGetUserReviewsQuery,
    useGetReviewByMovieIDQuery,
    useLazyGetReviewByMovieIDQuery,
    useCreateReviewMutation
} = userSessionApiSlice;

export default userSessionApiSlice;