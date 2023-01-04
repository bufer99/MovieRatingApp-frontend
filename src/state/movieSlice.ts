import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../types';
import type { RootState } from './store';

interface MovieState {
    activeMovie: Movie | null
}

const slice = createSlice({
    name: 'movie',
    initialState: { activeMovie: null } as MovieState,
    reducers: {
        setMovie: (state: MovieState, action: PayloadAction<Movie | null>) => {
            state.activeMovie = action.payload;
        },
    },
})

export const { setMovie } = slice.actions

export default slice.reducer

export const getMovie = (state: RootState) => state.movie.activeMovie;