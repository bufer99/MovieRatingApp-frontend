import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

console.log()

const BASE_URL: string = `${process.env.REACT_APP_API_URL}/auth`;

const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => {
        return {
          url: "users",
          method: 'POST',
          body
        }
      }
    }),
    login: build.mutation({
      query: (body) => {
        return {
          url: "login",
          method: 'POST',
          body
        }
      }
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApiSlice;

export default authApiSlice;
