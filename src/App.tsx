import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Box, Flex, Container, VStack, Grid, Input, Spacer, Spinner, ChakraProvider } from "@chakra-ui/react";
import MovieCard from './MovieCard';
import AddMovie from './AddMovie';
import './App.css'
import SearchResult from './SearchResult';
import { useLazyGetMoviesQuery } from './state/movieApiSlice';
import SearchBar from './SearchBar';

function App() {

  return (
    <ChakraProvider>
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
          <Box>
            My list
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
          <Grid
            justifyContent="center"
//            wrap="wrap"
            gap={'10px'}
            gridTemplateColumns="repeat(auto-fit, minmax(150px, max-content))"
          >

            <AddMovie />
          </Grid>


        </Container>

      </Container >
    </ChakraProvider>
  )
}

export default App

/*
routes:
  Home
  myMovies
  Movie
*/