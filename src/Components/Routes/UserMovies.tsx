import { useAppSelector, useAppDispatch } from '../../state/store';
import { useGetUserReviewsQuery } from '../../state/userMovieApiSlice';
import { Spinner } from '@chakra-ui/react';
import MovieCard from '../MovieCard';

export default function UserMovies() {

    const { isError, isLoading, data } = useGetUserReviewsQuery();
    const movies = useAppSelector(state => state.movie.movies);
    console.log(data);

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <>
            {data?.reviews.map(e => (
                <MovieCard title = {e.movie.title} poster_path = {e.movie.poster_path}/>
            ))}
        </>
    )
}