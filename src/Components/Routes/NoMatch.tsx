import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NoMatch() {
    return (
        <Flex
            color="white"
            h="calc(100vh - 5rem)"
            position="fixed"
            right="0"
            top="0"
            w="100%"
            justifyContent="center"
        >
            <Flex
                justifyContent="center"
                alignItems="center"
                direction="column"
                fontSize={["32px", "40px", "50px", "64px"]}
            >
                <Text>Are You Lost?</Text>
                <Link to="/">
                    <Text
                        as="u"
                        textAlign="center"
                        whiteSpace="nowrap"
                    >
                        Get Back On Track
                    </Text>
                </Link>
            </Flex>
        </Flex>
    )
}