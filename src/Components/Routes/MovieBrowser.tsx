import { Container, Flex, Image, Box, useMediaQuery, Grid, SimpleGrid, Text, Tooltip, Button, Modal, useEditable, Spinner } from "@chakra-ui/react"
import SearchBar from "../SearchBar"
import { Movie } from "../../types"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../state/store"
import { getMovie } from "../../state/movieSlice"
import Login from "./Login"
import StarRating from "../StarRating"
import { useLazyGetReviewByMovieIDQuery } from "../../state/userSessionApiSlice"
import RouteIndicator from "../RouteIndicator"

const MovieAttribute = ({ label, value, children, onClick }:
    {
        label?: string,
        value?: string | number | React.ReactNode,
        children?: React.ReactNode,
        onClick?: React.MouseEventHandler<HTMLParagraphElement>
    }) => {

    if (children) {
        return (
            <Flex direction="column" gap="5px">
                <Text
                    textTransform="uppercase"
                    fontFamily="monospace"
                    color="gray.400"
                    as="b"
                    cursor={onClick ? 'pointer' : undefined}
                    onClick={onClick ? onClick : undefined}
                    w="max-content"
                >{label}</Text>
                <Text as="em">
                    {children}
                </Text>
            </Flex>
        )
    }

    return (
        <Box>
            <Text textTransform="uppercase" fontFamily="monospace" color="gray.400" as="b">{label}</Text>
            {value && <Text pl="10px" as="b">{value}</Text>}
        </Box>
    )
}

export default function MovieBrowser() {


    //const [selectedMovie, setMovie] = useState<Movie | null>(null)
    const [isRating, setIsRating] = useState<boolean>(false);
    const [signInForm, setSignInForm] = useState<boolean>(false);
    const [toggleReview, setToggleReview] = useState<boolean>(false);

    const checkForReview = () => {
        if (currentData?.review.review) setToggleReview(!toggleReview)
    }

    const movie = useAppSelector(state => state.movie.activeMovie);
    const [trigger, { isFetching, isError, currentData, error }] = useLazyGetReviewByMovieIDQuery({
        pollingInterval: 100000,
    });

    const user = useAppSelector(state => state.auth.user)
    const [isMobile] = useMediaQuery('(max-width: 360px)');
    const [isGridWrap] = useMediaQuery('(max-width: 696px)');

    useEffect(() => {
        if (movie) {
            trigger(movie.id);
            setToggleReview(false);
        }

    }, [movie])

    const userRating = (): void => {

        if (user) setIsRating(true);
        else setSignInForm(true);
    }

    return (
        <Container

            position="relative"
            mx="0"
            w="100%"
            maxW="auto"
        >
            <RouteIndicator>
                Movie Browser
            </RouteIndicator>
            <SearchBar movie={movie} />

            {movie &&
                <SimpleGrid
                    as="article"
                    minChildWidth={isMobile ? '200px' : '300px'}
                    w="100%"
                    mt="2rem"
                    gap="2rem"
                    justifyItems="stretch"
                >

                    <Image
                        justifySelf={isGridWrap ? "center" : "right"}
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        maxH="600px"
                    />

                    <Container
                        color="white"
                        fontSize={['md', 'xl', '2xl', '3xl']}
                        justifySelf={isGridWrap ? "center" : "left"}
                        m="0"
                        p="0"
                        mb="2rem"
                        maxW={isGridWrap ? "500px" : ""}

                    >
                        <Flex
                            direction="column"
                        >
                            <Box>
                                <MovieAttribute label={"Title:"} value={movie.title} />
                            </Box>
                            <Box>
                                <MovieAttribute label={"Released:"} value={movie?.release_date.slice(0, 4)} />
                            </Box>
                            <Flex gap="10px">
                                <Tooltip fontSize='xl' hasArrow label="The Movie DB">TMDB</Tooltip>
                                <MovieAttribute label={"Rating:"} value={movie.vote_average} />
                            </Flex>
                            <Flex>
                                <Flex
                                    alignItems="baseline"
                                >
                                    <Text textTransform="uppercase" fontFamily="monospace" color="gray.400" as="b">Your rating:</Text>
                                    {
                                        isFetching ?
                                            <Spinner />
                                            :
                                            currentData?.review?.rating ?
                                                <Text pl="10px" as="b">{currentData.review.rating}</Text>
                                                :
                                                <Button zIndex={0} size={['xs', 'sm', 'md', 'md']} alignSelf="center" onClick={userRating} colorScheme="blue">Rate</Button>
                                    }
                                </Flex>
                                <StarRating max={10} isOpen={isRating} onClose={() => { setIsRating(false); trigger(movie.id) }} />
                                <Login isOpen={signInForm} onClose={() => setSignInForm(false)} forwardto="/" />
                            </Flex>
                        </Flex>
                        <MovieAttribute
                            label={toggleReview ? "Your comment:" : "Overview:"}
                            onClick={checkForReview}
                        >
                            {currentData?.review?.review ? toggleReview ? currentData?.review?.review : movie.overview : movie.overview}
                        </MovieAttribute>
                    </Container>
                </SimpleGrid >
            }
        </Container>
    )




}