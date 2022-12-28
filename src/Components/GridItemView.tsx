import { Box, Flex, Text } from "@chakra-ui/react"
import React from "react"
import { motion } from "framer-motion"

export function Preview({ children, label }: { children: React.ReactNode, label: string }) {
    return (
        <Flex
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transitionDuration="200ms"

            h="100%"
            fontSize={['xxx-large']}
            justifyContent="center"
            alignItems="center"
            position="relative"
        >
            <Box
                position="absolute"
                top="0"
                left="10px"
                fontSize={['x-large']}

            >
                <Text as="u">{label}</Text>
            </Box>
            {children}
        </Flex>
    )
}


export function Content({ children }: { children: React.ReactNode }) {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}