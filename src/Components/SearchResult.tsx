import { useEffect, useState } from 'react'
import { Box, Flex, Container, VStack, Grid, Input, Image, color, Spinner } from "@chakra-ui/react";
import { StarIcon } from '@chakra-ui/icons';
import { Movie } from '../types';
import { useAppDispatch } from '../state/store';
import { setMovie } from '../state/movieSlice';

export default function SearchResult({ movie, loseFocus, onClick }: { movie: Movie, loseFocus: () => void, onClick: () => void }) {

    const { title, backdrop_path, poster_path, vote_average, release_date } = movie;
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useAppDispatch()

    return (
        <Flex
            zIndex={1}
            bg="#1A202C"
            color="white"
            onClick={() => {
                dispatch(setMovie(movie));
                loseFocus()
                onClick()
            }}
            opacity={isLoaded ? `1` : '0'}
            padding="5px"
            width="100%"
            cursor="pointer"
            transition="opacity 1.5s, background .5s"
            _hover={{
                background: "gray.700",
            }}
            borderTop="1px solid #404040"

        >
            <Image
                onLoad={() => setIsLoaded(true)}
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt={title}
                maxH="80px"
                loading='lazy'
                height="100%"
                width="auto"
            />
            <Flex
                direction="column"
                margin="0 0 0 10px"
            >
                <Box
                    fontWeight="bold"
                    letterSpacing=".5px"
                    maxW="100%"
                    whiteSpace="normal"
                //textOverflow="ellipsis"
                //overflow="hidden"
                //whiteSpace="nowrap"
                >
                    {title}
                </Box>
                <Box
                    width="max-content"
                >
                    {release_date?.slice(0, 4)}
                </Box>
                <Flex
                    alignItems="center"
                    gap="5px"
                >
                    <Box>{vote_average}</Box>
                    <StarIcon />
                </Flex>
            </Flex>
        </Flex>
    )
}