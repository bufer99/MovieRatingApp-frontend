import { Container, Flex, Image, Box, useMediaQuery, Grid, SimpleGrid  } from "@chakra-ui/react"
import SearchBar from "../SearchBar"
import { Movie } from "../../types"
import { useState } from "react"
import { useAppSelector } from "../../state/store"
import { getMovie } from "../../state/movieSlice"

export default function MovieBrowser() {

    const [selectedMovie, setMovie] = useState<Movie | null>(null)
    const movie = useAppSelector((state) => state.movie.activeMovie);
    const [isMobile] = useMediaQuery('(max-width: 500px)');
    console.log(movie)

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
                    minChildWidth='400px'
                    w="100%"
                >
                    <Image
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        
                    />
                    <Container
                        color="white"
                        fontSize="1.5rem"
                        
                    >
                        {movie.overview}
                    </Container>
                </SimpleGrid >
            }
        </Container>
    )
}