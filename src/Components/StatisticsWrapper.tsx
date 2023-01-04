import { Box, Container, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { motion } from "framer-motion"

export default function StatisticsWrapper({ children, colLabels }:
    {
        children: React.ReactNode,
        colLabels: Array<string>
    }) {

    return (
        <Container
            as={motion.div}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            transitionDelay="50ms"
            transitionDuration="200ms"
            h="100%"
            p="0"
            fontSize={['1rem', 'md', 'lg', 'xl']}
            maxW="max-content"
        >
            <Box
                color="black"
                h="100%"
                padding="1rem"
                overflowY="auto"
            >
                <TableContainer
                    
                >
                    <Table
                        whiteSpace="nowrap"
                        variant="unstyled"
                        color="white"
                        overflowX="auto"
                    >
                        <Thead>
                            <Tr
                                borderBottom="2px white solid"
                            >
                                <Th>#</Th>
                                {colLabels.map(e => (<Th key={e} textAlign="center">{e}</Th>))}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {children}
                        </Tbody>
                    </Table>
                </TableContainer>

            </Box>
        </Container>
    )
}
