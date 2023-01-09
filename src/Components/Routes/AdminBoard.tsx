import { Container, Grid, Td, Tr, useMediaQuery, } from "@chakra-ui/react";
import { useState } from "react";
import { useGetReviewsQuery, useGetUsersQuery, useGetMoviesQuery } from "../../state/userSessionApiSlice";
import { AnimatePresence } from "framer-motion";
import { Preview } from "../GridItemView";
import { TiGroup, TiMessage, TiVideo } from "react-icons/ti";
import StatGridItem from "../StatGridItem";
import StatisticsWrapper from "../StatisticsWrapper";
import RouteIndicator from "../RouteIndicator";


export default function AdminBoard() {

    const { isError: reviewsError, isFetching: fetchingReviews, data: reviewsData } = useGetReviewsQuery();
    const { isError: usersError, isFetching: fetchingUsers, data: usersData } = useGetUsersQuery();
    const { isError: moviesError, isFetching: fetchingMovies, data: moviesData } = useGetMoviesQuery();

    const [isLargerThan750] = useMediaQuery('(min-width: 750px)', {
        ssr: false,
        fallback: true,
    })

    const [activeStat, setActiveStat] = useState<string | undefined>('');

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const id = (e.target as HTMLInputElement).closest('.item')?.id
        setActiveStat(id);
    }

    console.log(isLargerThan750)

    return (
        <Container
            color="white"
            maxW="none"
            p="0"
        >
            <RouteIndicator>
                Admin Dashboard
            </RouteIndicator>
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
                        <StatisticsWrapper colLabels={['user', 'No. review']}>

                            {fetchingUsers ? "Loading Users..." : usersData?.users.map((e, k) => (
                                <Tr key={k}>
                                    <Td>{k + 1}.</Td>
                                    <Td pr="0">{e.name}</Td>
                                    <Td textAlign="center" pl="0">{e.review_count}</Td>
                                </Tr>
                            ))}

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

                            <StatisticsWrapper colLabels={['movie', 'user', 'date']}>
                                {fetchingReviews ? "Loading Users..." : reviewsData?.reviews.map((e, k) => (
                                    <Tr key={k}>
                                        <Td>{k + 1}.</Td>
                                        <Td pr="0">{e?.movie?.title}</Td>
                                        <Td>{e?.user?.name}</Td>
                                        <Td><MyDate date_prop={e?.created_at} /></Td>
                                    </Tr>
                                ))}
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
                        <StatisticsWrapper colLabels={['movie', 'avg. rating', 'No. rating']}>
                            {fetchingMovies ? "Loading Movies..." : moviesData?.movies.map((e, k) => (
                                <Tr key={k}>
                                    <Td>{k + 1}.</Td>
                                    <Td pr="0">{e.title}</Td>
                                    <Td>{parseFloat(e.user_avg_rating).toFixed(1)}</Td>
                                    <Td>{e.vote_count}</Td>
                                </Tr>
                            ))}
                        </StatisticsWrapper>

                        :

                        <Preview label="Movies" isError={moviesError} isFetching={fetchingMovies}>
                            <TiVideo />
                        </Preview>
                    }
                </StatGridItem>
            </Grid>


        </Container >
    )
}


const MyDate = ({ date_prop }: { date_prop: string }) => {

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    const date = new Date(date_prop);
    const now = new Date();

    const milliseconds = Math.abs(date.getTime() - now.getTime());
    const hours = milliseconds / (1000 * 60 * 60);

    if (hours < 24) return <>{date.toLocaleString(undefined, options)}</>;

    return <>{date.toLocaleDateString(undefined, { ...options, hour: 'numeric', minute: 'numeric' })}</>;
}