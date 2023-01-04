import { Flex, Text } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"

export default function MovieCardDetails({ rating, review }: { rating?: number, review: string}) {
    return (
            <Flex
                className="rating"
                fontSize="2xl"
                color={"white"}
                direction="column"
                alignItems={"center"}
                justifyContent="space-between"
                px="1rem"
            >
                <Flex
                    alignItems={"center"}
                    gap="5px"
                >
                    <StarIcon />
                    <Text>{rating}/10</Text>
                </Flex>
                
                <Text as="em" wordBreak="break-word">{review}</Text>
            </Flex>
    )
}