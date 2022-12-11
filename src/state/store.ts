import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import authApiSlice from "./authApiSlice";
import authSlice from "./authSlice";
import movieSlice from "./movieSlice";
import movieApiSlice from "./movieApiSlice";
import userMovieApiSlice from './userMovieApiSlice'

export const store = configureStore({
  reducer: {
    [movieApiSlice.reducerPath]: movieApiSlice.reducer,
    [userMovieApiSlice.reducerPath]: userMovieApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    auth: authSlice,
    movie: movieSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(movieApiSlice.middleware)
      .concat(userMovieApiSlice.middleware)
      .concat(authApiSlice.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector