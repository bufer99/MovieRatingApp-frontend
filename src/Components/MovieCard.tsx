import "./MovieCard.css";

import { StarIcon } from "@chakra-ui/icons";
import { Box, Image, Flex, ScaleFade } from "@chakra-ui/react"
import { useState } from "react";

interface MovieProps {
    title?: string,
    rating?: number,
    backdrop_path?: string,
    poster_path?: string,
    vote_average?: number
}

export default function MovieCard(props: MovieProps) {

    const { title, rating, backdrop_path, poster_path, vote_average } = props;
    const [onMouse, setOnMouse] = useState<boolean>(false);

    return (
        <Box
            w="300px"
            position={"relative"}
        >
            <Flex
                onMouseEnter={() => setOnMouse(true)}
                onMouseLeave={() => setOnMouse(false)}
                className="card"
                position={"absolute"}
                justifyContent={"center"}
                alignItems={"center"}
                height="100%"
                width="100%"
                borderRadius="5%"
                transition={"background 200ms"}
                _hover={{
                    background: "rgba(0, 0, 0, 0.5)",
                    cursor: "pointer"
                }}
            >
                <ScaleFade initialScale={0.9} in={onMouse}>
                    <Flex
                        className="rating"
                        fontSize="2xl"
                        color={"white"}
                        direction="column"
                    >
                        <Flex
                            alignItems={"center"}
                            gap="5px"
                        >
                            <StarIcon />
                            <span>{rating}/10</span>
                        </Flex>
                        <span style={{ "textOverflow": "ellipsis", "overflow": "hidden", "whiteSpace": "nowrap", }}>{title}</span>
                    </Flex>
                </ScaleFade>
            </Flex>

            <Image
                borderRadius="5%"
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            ></Image>
        </Box>
    )
}