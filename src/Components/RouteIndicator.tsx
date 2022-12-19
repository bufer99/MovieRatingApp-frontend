import { Box } from "@chakra-ui/react"

export default function RouteIndicator({ children }: { children: React.ReactNode }) {

    return (
        <Box
            h="2rem"
            mb="2rem"
            color="white"
            fontSize={['3xl']}
            textAlign="center"
        >
            {children}
        </Box>
    )

}