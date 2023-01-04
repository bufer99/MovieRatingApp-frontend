import { Box, GridItem, Image, useMediaQuery, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CloseButton, OpenButton } from "./Buttons";
import { motion } from "framer-motion";

export default function StatGridItem({ activeStat, id, children, handleClick, gridArea, bg = "#33335f", onClose }:
{
    activeStat: string | undefined,
    id: string | undefined,
    children: React.ReactNode,
    handleClick: (e: React.MouseEvent<HTMLInputElement>) => void,
    gridArea: string,
    bg?: string,
    onClose: () => void
}){


const [isLargerThan750] = useMediaQuery('(min-width: 750px)')
const COVER_GRID = isLargerThan750 ? "1 / 1 / span 2 / span 2" : "1 / 1 / span 3 / span 2";

const active = activeStat === id;
const [zIndex, setZindex] = useState<number>(0);
useEffect(() => {
    if (active) setZindex(2)
}, [active])

const [popupHelp, setPopupHelp] = useState<boolean>(false);



return (
    <GridItem
        position="relative"
        as={motion.div}
        layout
        onTransitionEnd={() => { if (!active) setZindex(0) }}
        borderRadius="10px"
        gridArea={activeStat === id ? COVER_GRID : gridArea}
        zIndex={zIndex}
        bg={bg}
        className="item"
        id={id}

        onDoubleClick={() => {
            if (!popupHelp && !active) {
                setPopupHelp(true);
                const timeOut = setTimeout(() => {
                    setPopupHelp(false);
                    clearTimeout(timeOut);
                }, 3000);
            }
        }}
    >
        {active ? <CloseButton onClose={onClose} /> :
            <Box
                position="relative"
            >
                <Box position="relative" zIndex="11">
                    <OpenButton onOpen={handleClick} />
                </Box>
                <Box
                    display={popupHelp ? "block" : "none"}
                    position="absolute"
                    h="200px"
                    right="0"
                    zIndex="10"
                >
                    <Image
                        h="100%"
                        src={"/arrow.gif"}
                        transform="rotate(180deg)"
                    ></Image>
                </Box>
            </Box>
        }
        {children}
    </GridItem >
)
}