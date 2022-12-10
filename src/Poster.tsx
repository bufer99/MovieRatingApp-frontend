import { Image } from "@chakra-ui/react"

interface PosterProps {
    title: string,
    poster_path: string,
}

export default function Poster(props: PosterProps) {

    const {title, poster_path} = props;

    <Image
        //opacity={isLoaded ? '1' : '0'}
        //onLoad={() => { setIsLoaded(true) }}
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={title}
        maxH="80px"
        loading='lazy'
        height="100%"
        width="auto"
    />
}