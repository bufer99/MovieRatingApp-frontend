import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Box, Flex, Container } from "@chakra-ui/react";
import SearchBar from './SearchBar';
import { Outlet, Link } from "react-router-dom";
import { useAppSelector } from '../state/store';

function Layout() {

    const user = useAppSelector(state => state.auth.user);

    return (
        <Container
            minW="100%"
            minH="100vh"
            display="flex"
            flexDirection="column"
            backgroundColor="#6a038a"
            padding="0"
        >
            <Flex
                minW="100%"
                minH="100px"
                bg="#4e027d"
                color="white"
                alignItems="center"
                gap="30px"
                padding="0 0 0 100px"
            >
                {user && <Box>{user.name}</Box>}
                <Box>
                    <Link to="/">Browse</Link>
                </Box>

                <Box>
                    <Link to="/movies">My List</Link>
                </Box>
                <Box>
                    <Link to="/login">Login</Link>
                </Box>
                <Container
                    position="relative"
                    maxW="400px"
                    padding="0"
                    margin="0"
                >
                    <SearchBar />
                </Container>
            </Flex>

            <Container maxW="1800px" padding={"50px 0"}>
                <Outlet />
            </Container>

        </Container >
    )
}

export default Layout