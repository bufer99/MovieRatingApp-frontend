import { Box, Image } from "@chakra-ui/react"

interface MovieProps {
    title?: string,
    rating?: number,
    backdrop_path?: string,
    poster_path?: string,
    vote_average?: number
}

export default function MovieCard(props: MovieProps) {

    const { title, rating, backdrop_path, poster_path, vote_average } = props;

    return (
        <Box
            w="150px"
        >
            <Image
                borderRadius="5%"
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            ></Image>
            {<div style={{ "textOverflow": "ellipsis", "overflow": "hidden", "whiteSpace": "nowrap", }}>{title}</div>}
        </Box>
    )
}