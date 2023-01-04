import { useGetUserReviewsQuery } from '../../state/userSessionApiSlice';
import MovieCard from '../MovieCard/MovieCard';
import { Flex, Box, Spinner } from '@chakra-ui/react';
import ReviewsGrid from '../ReviewsGrid';
import React from 'react';
import RouteIndicator from '../RouteIndicator';


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

    const { isFetching, data } = useGetUserReviewsQuery();
    return (
        <React.Fragment>
            <RouteIndicator>
                Movies you rated
            </RouteIndicator>
            <ReviewsGrid>
                {data?.reviews.map(e => (
                    <MySkeleton
                        isLoaded={!isFetching}
                        key={e.id}
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