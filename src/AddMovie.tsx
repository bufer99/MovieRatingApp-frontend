import { Box } from "@chakra-ui/react"
import { AddIcon } from '@chakra-ui/icons'
import { useState } from "react"


export default function AddMovie() {

    const [bgColor, setBgColor] = useState("black");

    return (
        <Box
            w="150px"
            h="225px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            border="3px solid black"
            borderRadius="5%"
            cursor="pointer"
            _hover={{
                border:`3px solid #805AD5`
            }}
            onMouseMove={() => setBgColor("#805AD5")}
            onMouseLeave={() => setBgColor("black")}
        >
            <AddIcon boxSize={20} color={bgColor}/>
        </Box>
    )
}