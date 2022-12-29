import { Box, Container, Flex, Grid, GridItem, Spinner, Text, } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { CloseButton, OpenButton } from "../Buttons";
import { useGetReviewsQuery, useGetUsersQuery, useGetMoviesQuery } from "../../state/userSessionApiSlice";
import { AnimatePresence, motion } from "framer-motion";
import { Preview, Content } from "../GridItemView";





const StatisticsWrapper = ({ children, title }:
    { children: React.ReactNode, title: string }) => {
    return (
        <Container
            as={motion.div}
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            //transitionDelay="50ms"
            transitionDuration="200ms"
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

    const { isError: reviewsError, isFetching: fetchingReviews, data: reviewsData } = useGetReviewsQuery();
    const { isError: usersError, isFetching: fetchingUsers, data: usersData } = useGetUsersQuery();
    const { isError: moviesError, isFetching: fetchingMovies, data: moviesData } = useGetMoviesQuery();

    const [activeStat, setActiveStat] = useState<string | undefined>('');

    const ref = useRef(null)

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const id = (e.target as HTMLInputElement).closest('.item')?.id
        console.log(id)
        setActiveStat(id);

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
                        <Preview label="Users"  isError={usersError} isFetching={fetchingUsers} data={usersData?.users[0].name + ':' + usersData?.users[0].review_count}>
                            
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
                    <AnimatePresence exitBeforeEnter={true}>
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

                            <Preview label="Reviews"  isError={reviewsError} isFetching={fetchingReviews} data={reviewsData?.reviews[0].movie.title}>
                                
                            </Preview>

                        }
                    </AnimatePresence>
                </StatGridItem>
                <StatGridItem
                    id="movie"
                    activeStat={activeStat}
                    handleClick={handleClick}
                    onClose={() => setActiveStat('')}
                    gridArea="2 / 1 / span 1 / span 2"
                >
                    {activeStat === "movie" ?
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

                        :

                        <Preview label="movie" isError={moviesError} isFetching={fetchingMovies} data={moviesData?.movies[0].title}>
                            
                        </Preview>
                    }
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

    const [zIndex, setZindex] = useState<number>(0);

    useEffect(() => {

        if (active) setZindex(2)
        console.log(`${id} ${zIndex}`)
    }, [active])

    return (
        <GridItem
            position="relative"
            as={motion.div}
            layout
            onTransitionEnd={() => { if (!active) setZindex(0) }}
            borderRadius="20px"
            gridArea={activeStat === id ? COVER_GRID : gridArea}
            zIndex={zIndex}
            bg={bg}
            className="item"
            id={id}
        >
            {active ? <CloseButton onClose={onClose} /> : <OpenButton onOpen={handleClick} />}
            {children}
        </GridItem >
    )
}