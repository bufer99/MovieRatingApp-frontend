import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';


// Define a type for the slice state
interface MovieState {
    movies: Array<string>
    //movies: string[]
}

// Define the initial state using that type
const initialState: MovieState = {
    movies: []
}

const slice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        addMovie: (state: MovieState, action: PayloadAction<Array<string>>) => {
            state.movies = [...state.movies, ...action.payload];
        },
    },
})

export const { addMovie } = slice.actions

export default slice.reducer

export const getMovies = (state: RootState) => state.movie;