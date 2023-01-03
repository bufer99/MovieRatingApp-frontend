import { Box, Flex, Text } from "@chakra-ui/react"
import React from "react"
import { motion } from "framer-motion"
import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks"
import { Movies, Reviews, Users } from "../state/userSessionApiSlice";

export function Preview({ children, label, isError, isFetching }:
    {
        children: React.ReactNode,
        label: string,
        isError: boolean,
        isFetching: boolean,
    }) {

    //const key = Object.keys(data)[0]

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

const ErrorMsg = () => {
    return (
        <Box>
            Error while fetching data, <wbr />please refresh the page
        </Box>
    )
}

export function Content({ children }: { children: React.ReactNode }) {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}