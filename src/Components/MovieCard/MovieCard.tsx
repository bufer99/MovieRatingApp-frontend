import { Box, Image, Flex, ScaleFade } from "@chakra-ui/react"
import { useState } from "react";
import MovieCardDetails from "./MovieCardDetails";

interface MovieProps {
    title?: string,
    rating?: number,
    backdrop_path?: string,
    poster_path?: string,
    vote_average?: number
    review: string
}

export default function MovieCard(props: MovieProps) {

    const { rating, poster_path, review } = props;
    const [onMouse, setOnMouse] = useState<boolean>(false);

    return (
        <Box
            position={"relative"}
            h="100%"
        >

            <Flex
                onMouseEnter={() => setOnMouse(true)}
                onMouseLeave={() => setOnMouse(false)}
                className="card"
                position={"absolute"}
                justifyContent={"center"}
                alignItems={"center"}
                h="100%"
                w="100%"
                transition={"background 200ms"}
                _hover={{
                    background: "rgba(0, 0, 0, 0.5)",
                    cursor: "pointer"
                }}
            >
                <ScaleFade initialScale={0.9} in={onMouse}>
                    <MovieCardDetails review={review} rating={rating}/>
                </ScaleFade>
            </Flex>

            <Image
                h="100%"
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            ></Image>

        </Box>
    )
}