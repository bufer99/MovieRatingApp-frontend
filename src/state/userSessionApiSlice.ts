import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { Movie, Review } from '../types';
import { logout } from "./authSlice";

const BASE_URL = "http://127.0.0.1:8000/api";

interface Response {
    status: number,
    reviews: Array<Review>
}

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

const userSessionApiSlice = createApi({
    reducerPath: "userMovieApi",
    baseQuery: baseQueryWithReauth,
    refetchOnMountOrArgChange: true,
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
        getReviewByMovieID: build.query<{ status: number, review: Review }, number>({
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