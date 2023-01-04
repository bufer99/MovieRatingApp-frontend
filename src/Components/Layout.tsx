import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Box, Flex, Container, Center } from "@chakra-ui/react";
import SearchBar from './SearchBar';
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../state/store';
import { logout } from '../state/authSlice';
import NavBar from './NavBar';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion'

function Layout() {

  const location = useLocation();
  
  return (
    <Box
      as='main'
      bg="#1A202C"
    >
      <NavBar />
      <AnimatePresence
        exitBeforeEnter
        initial={true}
      >
        <Container
          as={motion.div}
          mt="5rem"
          w="100%"
          minH="calc(100vh - 5rem)"
          h="max-content"
          maxWidth="1400px"
          key={location.key}
          pb="3rem"
        >
          <Outlet />
        </Container>
      </AnimatePresence>
    </Box>
  )
}

export default Layout