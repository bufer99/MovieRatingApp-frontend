import { Box, Container, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"

export default function StatisticsWrapper({ children, title }:
    { children: React.ReactNode, title: string }){
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
