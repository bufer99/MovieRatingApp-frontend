import { Container, Flex, Image, Box, useMediaQuery, Grid, SimpleGrid, Text, Tooltip, Button, Modal } from "@chakra-ui/react"
import SearchBar from "../SearchBar"
import { Movie } from "../../types"
import { useState } from "react"
import { useAppSelector } from "../../state/store"
import { getMovie } from "../../state/movieSlice"
import Login from "./Login"
import StarRating from "../StarRating"

const MovieAttribute = ({ label, value, children }:
    {
        label?: string,
        value?: string | number | React.ReactNode,
        children?: React.ReactNode,
    }) => {

    if (children) {
        return (
            <Flex direction="column" gap="5px">
                <Text textTransform="uppercase" fontFamily="monospace" color="gray.400" as="b">{label}</Text>
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

    const [selectedMovie, setMovie] = useState<Movie | null>(null)
    const [isRating, setIsRating] = useState<boolean>(false);

    const movie = useAppSelector(state => state.movie.activeMovie);
    const user = useAppSelector(state => state.auth.user)
    const [isMobile] = useMediaQuery('(max-width: 360px)');
    const [isGridWrap] = useMediaQuery('(max-width: 696px)');
    console.log(movie)

    const userRating = (): React.ReactNode => {
        if(user) setIsRating(true)
        return null;
    }

    return (
        <Container

            position="relative"
            mx="0"
            w="100%"
            maxW="auto"
        >
            <SearchBar movie={selectedMovie} />

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
                                <MovieAttribute label={"Your rating:"} value={<Button onClick={userRating} colorScheme={"blue"}>Rate</Button>} />
                                <StarRating max={10} isOpen={isRating} onClose={() => {setIsRating(false)}}/>
                            </Flex>
                        </Flex>
                        <MovieAttribute label={"Overview:"}>
                            {movie.overview}
                        </MovieAttribute>
                    </Container>
                </SimpleGrid >
            }
        </Container>
    )




}