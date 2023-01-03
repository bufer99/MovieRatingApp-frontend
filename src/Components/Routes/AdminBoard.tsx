import { Box, Container, Flex, Grid, GridItem, Image, Spinner, Text, useMediaQuery, } from "@chakra-ui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { CloseButton, OpenButton } from "../Buttons";
import { useGetReviewsQuery, useGetUsersQuery, useGetMoviesQuery } from "../../state/userSessionApiSlice";
import { AnimatePresence, motion } from "framer-motion";
import { Preview, Content } from "../GridItemView";
import { TiGroup, TiMessage, TiVideo } from "react-icons/ti";
import StatGridItem from "../StatGridItem";
import StatisticsWrapper from "../StatisticsWrapper";


export default function AdminBoard() {

    const { isError: reviewsError, isFetching: fetchingReviews, data: reviewsData } = useGetReviewsQuery();
    const { isError: usersError, isFetching: fetchingUsers, data: usersData } = useGetUsersQuery();
    const { isError: moviesError, isFetching: fetchingMovies, data: moviesData } = useGetMoviesQuery();

    const [isLargerThan750] = useMediaQuery('(min-width: 750px)')
    const [activeStat, setActiveStat] = useState<string | undefined>('');

    const ref = useRef(null)

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const id = (e.target as HTMLInputElement).closest('.item')?.id
        console.log(id)
        setActiveStat(id);
    }


    return (
        <Container
            color="white"
            maxW="none"
            p="0"
        >
            <Grid
                h='80vh'
                maxH="800px"
                templateRows={isLargerThan750 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'}
                templateColumns='repeat(2, 1fr)'
                gap={8}
                color="black"
            >
                <StatGridItem
                    id="user"
                    activeStat={activeStat}
                    handleClick={handleClick}
                    onClose={() => setActiveStat('')}
                    gridArea={isLargerThan750 ? "1 / 1 / span 1 / span 1" : "1 / 1 / span 1 / span 2"}
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
                        <Preview
                            isError={usersError}
                            isFetching={fetchingUsers}
                            label="Users"
                        >
                            <TiGroup />
                        </Preview>
                    }

                </StatGridItem>
                <StatGridItem
                    id="review"
                    activeStat={activeStat}
                    handleClick={handleClick}
                    onClose={() => setActiveStat('')}
                    gridArea={isLargerThan750 ? "1 / 2 / span 1 / span 1" : "2 / 1 / span 1 / span 2"}
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

                            <Preview label="Reviews" isError={reviewsError} isFetching={fetchingReviews}>
                                <TiMessage />
                            </Preview>

                        }
                    </AnimatePresence>
                </StatGridItem>
                <StatGridItem
                    id="movie"
                    activeStat={activeStat}
                    handleClick={handleClick}
                    onClose={() => setActiveStat('')}
                    gridArea={isLargerThan750 ? "2 / 1 / span 1 / span 2" : "3 / 1 / span 1 / span 2"}
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

                        <Preview label="Movies" isError={moviesError} isFetching={fetchingMovies}>
                            <TiVideo />
                        </Preview>
                    }
                </StatGridItem>
            </Grid>


        </Container>
    )
}

