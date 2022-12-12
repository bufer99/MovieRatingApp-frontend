import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Box, Flex, Container } from "@chakra-ui/react";
import SearchBar from './SearchBar';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../state/store';
import { logout } from '../state/authSlice';

function Layout() {

    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <Flex
            maxW="none"
            minH="100vh"
            direction="column"
            backgroundColor="#6a038a"
            padding="0"
        >
            <Flex
                width="100%"
                bg="#4e027d"
                justifyContent="center"
            >
                <Flex
                    maxW='1920px'
                    w='100%'
                    minH="80px"
                    color="white"
                    alignItems="center"
                    justifyContent={"space-between"}
                    gap="30px"
                    padding="0 100px"
                    fontSize="xl"
                >
                    <Flex
                        gap="10px"
                    >
                        <Box>
                            <Link to="/">Browse</Link>
                        </Box>

                        <Box>
                            <Link to="/movies">My List</Link>
                        </Box>

                        {user &&
                            <Box
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(logout());
                                    navigate('/');
                                }}
                                cursor="pointer"
                            >
                                logout
                            </Box>
                        }


                    </Flex>
                    <Container
                        position="relative"
                        maxW="400px"
                        padding="0"
                        margin="0"
                    >
                        <SearchBar />
                    </Container>
                    {user ? <Box>{user.name}</Box> : <Box>
                        <Link to="/login">Login</Link>
                    </Box>}
                </Flex>
            </Flex>

            <Container maxW="1800px" padding={"50px 0"}>
                <Outlet />
            </Container>

        </Flex >
    )
}

export default Layout