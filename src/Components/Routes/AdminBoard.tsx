import { Box, Container, Flex, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useGetUserReviewsQuery, useGetUsersQuery, useGetMoviesQuery } from "../../state/userSessionApiSlice";
import { motion } from "framer-motion";





const StatisticsWrapper = ({ children, title }:
    { children: React.ReactNode, title: string }) => {
    return (
        <Container
            maxH="100%"
            overflowY="hidden"
        >
            <Text as="h4">{title}</Text>
            <Box

                bg="white"
                color="black"
                borderRadius="10px"
                h="100%"

                padding="1rem"
            >
                {children}
            </Box>
        </Container>
    )
}

//users - most ratings
//movies - worst/best
//latest - review

//create user
//

export default function AdminBoard() {

    const { isFetching: fetcingReviews, data: reviewsData } = useGetUserReviewsQuery();
    const { isFetching: fetchingUsers, data: usersData } = useGetUsersQuery();
    const { isFetching: fetchingMovies, data: moviesData } = useGetMoviesQuery();

    const [activeStat, setActiveStat] = useState<string | undefined>('');

    const ref = useRef(null)

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const id = (e.target as HTMLInputElement).closest('.item')?.id
        console.log(id)
        activeStat === id ? setActiveStat('') : setActiveStat(id)
    }


    useEffect(() => {
        console.log(activeStat)
    }, [activeStat])



    const StatGridItem = ({ activeStat, id, children }:
        {
            activeStat: string | undefined,
            id: string | undefined,
            children: React.ReactNode
        }) => {
        return (
            <GridItem
                as={motion.div}
                layout
                gridArea={activeStat === id ? "1 / 1 / span 2 / span 2" : "1 / 1 / span 1 / span 1"}
                zIndex={activeStat === id ? 2 : 0}
                bg='tomato'
                className="item"
                id={id}
                onClick={handleClick}
            >
                {children}
            </GridItem >
        )
    }



    return (
        <Container
            color="white"
        >
            <Grid
                h='600px'
                templateRows='repeat(2, 300px)'
                templateColumns='repeat(2, 1fr)'
                gap={8}
            >
                <StatGridItem
                    id="user"
                    activeStat={activeStat}
                >
                    <StatisticsWrapper title="Users">
                        <Flex
                            wrap="wrap"
                            gap="1rem"
                            direction="column"
                        >
                            {fetchingUsers ? "Loading Users..." : usersData?.users.map(e => (
                                <Box>{e.name}: {e.review_count}</Box>
                            ))}
                        </Flex>
                    </StatisticsWrapper>
                </StatGridItem>
                <GridItem
                    as={motion.div}
                    layout
                    gridColumn="2 / span 1"
                    gridRow="1 / span 1"
                    gridArea={activeStat === "review" ? "1 / 1 / span 2 / span 2" : "1 / 2 / span 1 / span 1"}
                    zIndex={activeStat === "review" ? 2 : 0}
                    bg='papayawhip'
                    className="item"
                    id="review"
                    onClick={handleClick}
                >
                    <StatisticsWrapper title="Reviews">
                        <Flex
                            wrap="wrap"
                            gap="1rem"
                            direction="column"

                        >
                            {fetcingReviews ? "Loading Reviews..." : reviewsData?.reviews.map(e => (
                                <Box>{e.rating}</Box>
                            ))}

                        </Flex>
                    </StatisticsWrapper>
                </GridItem>
                <GridItem
                    as={motion.div}
                    layout
                    gridColumn="2 / span 1"
                    gridRow="1 / span 1"
                    gridArea={activeStat === "movie" ? "1 / 1 / span 2 / span 2" : "2 / 1 / span 1 / span 2"}
                    zIndex={activeStat === "movie" ? 2 : 0}
                    bg='papayawhip'
                    className="item"
                    id="movie"
                    onClick={handleClick}
                >
                    <StatisticsWrapper title="Movies">
                        <Flex
                            wrap="wrap"
                            gap="1rem"
                            direction="column"

                        >
                            {fetchingMovies ? "Loading Movies..." : moviesData?.movies.map(e => (
                                <Box>{e.title}</Box>

                            ))}

                        </Flex>
                    </StatisticsWrapper>
                </GridItem>

            </Grid>


        </Container>
    )
}