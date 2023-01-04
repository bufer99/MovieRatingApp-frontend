import { Box, Flex, Text } from "@chakra-ui/react"
import React from "react"
import { motion } from "framer-motion"

export function Preview({ children, label }:
    {
        children: React.ReactNode,
        label: string,
        isError: boolean,
        isFetching: boolean,
    }) {

    return (
        <Flex
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transitionDuration="200ms"
            color="white"
            h="100%"
            fontSize={['xxx-large']}
            justifyContent="center"
            alignItems="center"
            position="relative"
        >
            <Flex
                justifyContent="center"
                alignItems="center"
                gap="1rem"
            >
                {children}
                <Text>{label}</Text>
            </Flex>
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