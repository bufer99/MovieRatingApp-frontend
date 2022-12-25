import { Box, Container, Flex, Grid, GridItem, Spinner, Text, } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { CloseButton, OpenButton } from "../Buttons";
import { useGetReviewsQuery, useGetUsersQuery, useGetMoviesQuery } from "../../state/userSessionApiSlice";
import { motion } from "framer-motion";
import { Preview, Content } from "../GridItemView";





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

const COVER_GRID = "1 / 1 / span 2 / span 2";

export default function AdminBoard() {

    const { isFetching: fetchingReviews, data: reviewsData } = useGetReviewsQuery();
    const { isFetching: fetchingUsers, data: usersData } = useGetUsersQuery();
    const { isFetching: fetchingMovies, data: moviesData } = useGetMoviesQuery();

    const [activeStat, setActiveStat] = useState<string | undefined>('');

    const ref = useRef(null)

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const id = (e.target as HTMLInputElement).closest('.item')?.id
        console.log(id)
        setActiveStat(id)
    }


    useEffect(() => {
        console.log(reviewsData)

    }, [fetchingReviews])







    return (
        <Container
            color="white"
            maxW="none"
        >
            <Grid
                h='600px'
                templateRows='repeat(2, 300px)'
                templateColumns='repeat(2, 1fr)'
                gap={8}
                color="black"
            >
                <StatGridItem
                    id="user"
                    activeStat={activeStat}
                    handleClick={handleClick}
                    onClose={() => setActiveStat('')}
                    gridArea="1 / 1 / span 1 / span 1"
                    bg="tomato"
                >

                    {activeStat === "user" ?
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
                        :
                        <Preview label="Users">
                            <Box>
                                {fetchingUsers ? "Loading..." :
                                    usersData?.users[0].name}: {usersData?.users[0].review_count}
                            </Box>
                        </Preview>
                    }

                </StatGridItem>
                <StatGridItem
                    id="review"
                    activeStat={activeStat}
                    handleClick={handleClick}
                    onClose={() => setActiveStat('')}
                    gridArea="1 / 2 / span 1 / span 1"
                >
                    {activeStat === "review" ?
                        <StatisticsWrapper title="Reviews">
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
                        :
                        <Preview label="Reviews">
                            <Box>
                                {fetchingReviews ? "Loading..." : `${reviewsData?.reviews[0].movie.title}: ${reviewsData?.reviews[0].rating}/10`}
                            </Box>
                        </Preview>
                    }
                </StatGridItem>
                <StatGridItem
                    id="movie"
                    activeStat={activeStat}
                    handleClick={handleClick}
                    onClose={() => setActiveStat('')}
                    gridArea="2 / 1 / span 1 / span 2"
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
                </StatGridItem>
            </Grid>


        </Container>
    )
}

const StatGridItem = ({ activeStat, id, children, handleClick, gridArea, bg = "papayawhip", onClose }:
    {
        activeStat: string | undefined,
        id: string | undefined,
        children: React.ReactNode,
        handleClick: (e: React.MouseEvent<HTMLInputElement>) => void,
        gridArea: string,
        bg?: string,
        onClose: () => void
    }) => {

    const active = activeStat === id;

    return (
        <GridItem
            position="relative"
            as={motion.div}
            layout
            borderRadius="20px"
            gridArea={activeStat === id ? COVER_GRID : gridArea}
            zIndex={activeStat === id ? 2 : 0}
            bg={bg}
            className="item"
            id={id}
        >
            {active ? <CloseButton onClose={onClose} /> : <OpenButton onOpen={handleClick} />}
            {children}
        </GridItem >
    )
}