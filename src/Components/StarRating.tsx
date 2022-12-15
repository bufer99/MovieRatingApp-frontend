import { BsStarFill, BsStar } from "react-icons/bs";
import { Box, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Textarea } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../state/store";
import { useCreateReviewMutation } from "../state/userSessionApiSlice";

export default function StarRating({ max, isOpen, onClose }: { max: number, isOpen: boolean, onClose: () => void }) {

    const [hoverRating, setHoverRating] = useState<number>(-1);
    const [rating, setRating] = useState<number>(-1);
    const movie = useAppSelector(state => state.movie.activeMovie);
    const [comment, setComment] = useState<string>('');

    const Star = ({ filled, color, onMouseEnter, onClick }:
        {
            filled?: boolean,
            color?: string,
            onMouseEnter: React.MouseEventHandler<SVGElement>,
            onClick: React.MouseEventHandler<SVGElement>
        }) => {

        if (filled) return (
            <BsStarFill
                color={color}
                onMouseEnter={onMouseEnter}
                onClick={onClick}
                size="100%"
            />
        )
        return (<BsStar
            size="100%"
            color={color}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
        />)
    }

    const [trigger, { isSuccess }] = useCreateReviewMutation();



    const save = () => {
        trigger({
            "review": comment,
            "rating": rating,
            "movie": {
                "id": movie?.id,
                "title": movie?.title,
                "released": movie?.release_date,
                "poster_path": movie?.poster_path
            }
        }).then(() => onClose())
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={"#30344c"}>
                <ModalHeader>
                    <Flex color="white" direction="column">
                        <Box>How did you like</Box>
                        <Box fontSize="lg" textAlign="center">{movie?.title}</Box>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                        onMouseLeave={() => setHoverRating(-1)}
                        h="max-content"
                        gap="5px"
                        cursor="pointer"
                    >
                        {
                            [...Array(max).keys()].map(e => (
                                <Star
                                    color="yellow"
                                    filled={hoverRating > rating ? e < hoverRating : e < rating}
                                    onMouseEnter={() => setHoverRating(e + 1)}
                                    onClick={() => setRating(e + 1)}
                                />

                            ))
                        }
                    </Flex>
                    <Textarea onChange={(e) => setComment(e.target.value)} value={comment} maxLength={255} placeholder="Comment the movie" color="white" mt={"2rem"}></Textarea>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme='blue' mr={3} disabled={rating === -1} onClick={save}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
