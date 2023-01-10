import { Box,  Container } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from './NavBar';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion'



function Layout() {

  const location = useLocation();
  
  return (
    <Box
      as='main'
      bg="bg.body"
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