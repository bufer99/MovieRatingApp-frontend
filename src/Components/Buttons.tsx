import { ArrowBackIcon, CloseIcon } from "@chakra-ui/icons"
import { Box } from "@chakra-ui/react"

export function OpenButton({ onOpen, top, left, right = "0", bottom }:
    {
        onOpen: ((e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void),
        top?: string
        left?: string
        right?: string
        bottom?: string
    }) {
    return (
        <Box
            zIndex={3}
            onClick={onOpen}
            position="absolute"
            right={right}
            _hover={{
                bg: "rgba(128,128,128,20%)"
            }}
            transition="background 200ms"
            borderRadius="50%"
            margin="10px"
            cursor="pointer"
            h="30px"
            w="30px"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <ArrowBackIcon
                color="black"
                transform="rotate(135deg)"
            />
        </Box>
    )
}

export function CloseButton({ onClose, top, left, right = "0", bottom }:
    {
        onClose: () => void,
        top?: string
        left?: string
        right?: string
        bottom?: string
    }) {
    return (
        <Box
            zIndex={3}
            onClick={onClose}
            position="absolute"
            right={right}
            _hover={{
                bg: "rgba(128,128,128,20%)"
            }}
            transition="background 200ms"
            borderRadius="50%"
            margin="10px"
            cursor="pointer"
            h="30px"
            w="30px"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <CloseIcon
                color="black"
            />
        </Box>
    )
}