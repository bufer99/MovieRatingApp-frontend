import { useAppSelector, useAppDispatch } from '../state/store';
import { useGetUserReviewsQuery } from '../state/userMovieApiSlice';

export default function UserMovies(){

    const {isError, isLoading, data} = useGetUserReviewsQuery();
    const movies = useAppSelector(state => state.movie.movies);
    //console.log(movies);

    return (
        <></>
    )
}