import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Box, Flex, Container, Heading } from "@chakra-ui/react";
import SearchBar from './SearchBar';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../state/store';
import { logout } from '../state/authSlice';
import { useMediaQuery } from '@chakra-ui/react';
import UserMenu from './UserMenu';

export default function Navbar() {

    const [isMobile] = useMediaQuery('(max-width: 500px)');

    return (
        <Box
            as="nav"
            position="fixed"
            w="100%"
            h="5rem"
            bg="#1A202C"
            top={0}
            zIndex="2"
        >
            <Flex
                alignItems="center"
                justifyContent="space-around"
                bg="#1A202C"
                maxW="1400px"
                h="100%"
                m="auto"
                p="10px"
                borderRadius={isMobile ? '' : "50px"}
            >
                {true && <Heading as={"h1"} size="md" color={"white"}>
                    <Link to="/">Movie-Rating-App</Link>
                </Heading>}
                <UserMenu />
            </Flex>
        </Box>
    )
}