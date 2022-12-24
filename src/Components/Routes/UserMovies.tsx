import { useAppSelector, useAppDispatch } from '../../state/store';
import { useGetUserReviewsQuery } from '../../state/userSessionApiSlice';
import MovieCard from '../MovieCard/MovieCard';
import { Flex, Box, Skeleton, Spinner } from '@chakra-ui/react';
import AddMovie from '../AddMovie';
import ReviewsGrid from '../ReviewsGrid';
import React, { Children } from 'react';
import RouteIndicator from '../RouteIndicator';

const m = [
    {
        "adult": false,
        "backdrop_path": "/77P56ZcL8M9Cw7FIptMIGjhNJoj.jpg",
        "genre_ids": [
            12,
            878,
            28
        ],
        "id": 1858,
        "original_language": "en",
        "original_title": "Transformers",
        "overview": "Young teenager Sam Witwicky becomes involved in the ancient struggle between two extraterrestrial factions of transforming robots – the heroic Autobots and the evil Decepticons. Sam holds the clue to unimaginable power and the Decepticons will stop at nothing to retrieve it.",
        "popularity": 26.705,
        "poster_path": "/l7lnsnBfEVRYcp7ZcAOV8b3L3NB.jpg",
        "release_date": "2007-06-27",
        "title": "Transformers",
        "video": false,
        "vote_average": 6.7,
        "vote_count": 9742
    },
    {
        "adult": false,
        "backdrop_path": "/zbdoCe1meTyy0v1fsIxZ9Q0ef3H.jpg",
        "genre_ids": [
            878,
            28,
            12
        ],
        "id": 8373,
        "original_language": "en",
        "original_title": "Transformers: Revenge of the Fallen",
        "overview": "Sam Witwicky leaves the Autobots behind for a normal life. But when his mind is filled with cryptic symbols, the Decepticons target him and he is dragged back into the Transformers' war.",
        "popularity": 35.007,
        "poster_path": "/6jcxahM7BDAAeKkP4IF8WLFsJ3K.jpg",
        "release_date": "2009-06-19",
        "title": "Transformers: Revenge of the Fallen",
        "video": false,
        "vote_average": 6.1,
        "vote_count": 7393
    },
    {
        "adult": false,
        "backdrop_path": "/h3js4rulxzKMOokM2oO5Kr0mBZU.jpg",
        "genre_ids": [
            28,
            878,
            12
        ],
        "id": 38356,
        "original_language": "en",
        "original_title": "Transformers: Dark of the Moon",
        "overview": "The Autobots continue to work for NEST, now no longer in secret. But after discovering a strange artifact during a mission in Chernobyl, it becomes apparent to Optimus Prime that the United States government has been less than forthright with them.",
        "popularity": 29.241,
        "poster_path": "/juIr4ro90IBK7XlUpwo0cYqdnCI.jpg",
        "release_date": "2011-06-28",
        "title": "Transformers: Dark of the Moon",
        "video": false,
        "vote_average": 6.2,
        "vote_count": 7239
    }
]

const MySkeleton = ({ isLoaded, children }: { isLoaded: boolean, children: React.ReactNode }) => {

    return (
        <Flex
            position="relative"
        >
            <Box opacity={isLoaded ? '1' : '0'}>
                {children}
            </Box>
            <Flex
                display={isLoaded ? 'none' : 'flex'}
                position="absolute"
                h="100%"
                w="100%"
                justifyContent="center"
                alignItems="center"
                border="black 1px solid"
                transition="display 2s"
            >
                <Spinner color='white' size="xl" />
            </Flex>
        </Flex>
    )
}

export default function UserMovies() {

    const { isError, isLoading, isFetching, data } = useGetUserReviewsQuery();
    const user = useAppSelector(state => state.auth.user?.name);
    console.log(data)
    return (
        <React.Fragment>
            <RouteIndicator>
                Movies you rated
            </RouteIndicator>
            <ReviewsGrid>
                {data?.reviews.map(e => (
                    <MySkeleton
                        isLoaded={!isFetching}
                    >
                        <Box maxW="500px" h="100%">
                            <MovieCard key={e.id} rating={e.rating} review={e.review} title={e.movie.title} poster_path={e.movie.poster_path} />
                        </Box>
                    </MySkeleton>
                ))}
            </ReviewsGrid>
        </React.Fragment>
    )
}