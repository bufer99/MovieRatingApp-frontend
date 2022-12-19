import React, { useEffect, useRef, useState } from 'react'
import { Input, Flex, Box, Spinner, Skeleton, SkeletonText, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import SearchResult from './SearchResult';
import { useLazyGetMoviesQuery } from '../state/movieApiSlice';
import { Movie } from '../types';

export default function SearchBar({ movie }: { movie: Movie | null }) {

    const [outsideClick, setOutsideClick] = useState<boolean>(false)
    const [trigger, { isFetching, isError, data, error }] = useLazyGetMoviesQuery();
    const [onFocus, setOnFocus] = useState<boolean>(false);
    const [queryResult, setQueryResult] = useState<Array<Movie>>([]);
    const [inputValue, setInputValue] = useState(movie?.title);

    const handleOutSideclick = (e: React.MouseEvent<HTMLInputElement>): void => {
        console.log(e)
    }

    useEffect(() => {
        setInputValue(movie?.title);
    }, [movie])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value)
        if (e.target.value === "") setQueryResult([])
        else {
            trigger(e.target.value).then(res => {
                if (res.data) {
                    setQueryResult(res.data
                        .results
                        .filter(e => e.poster_path)
                        .sort((a, b) => b?.vote_count - a?.vote_count))
                }
            });
        }
    }

    return (
        <Flex
            position="relative"
            maxWidth="800px"
            mx="auto"
            zIndex={1}
        >


            <InputGroup>
                <Input
                    onBlur={() => setTimeout(() => setOnFocus(false),100)}
                    onFocus={() => setOnFocus(true)}
                    maxW="100%"
                    value={inputValue}
                    color="white"
                    type="text"
                    variant="outline"
                    onChange={onChange}
                    placeholder="Start typing"
                    _placeholder={{ opacity: 1, color: 'gray.500' }}
                    transition="width 1s"
                />
                <InputRightElement
                    w="max-content"
                >
                    <Button
                        onClick={() => setInputValue('')}
                        variant="ghost"
                        color="white"
                        w="max-content"
                        _hover={{
                            bg: "white",
                            color: "black"
                        }}
                    >
                        DELETE
                    </Button>
                </InputRightElement>
            </InputGroup>


            {onFocus && inputValue && <Flex
                top="100%"
                className='results'
                background="gray.800"
                position="absolute"
                flexDirection="column"
                width="100%"
                overflowY="scroll"
                maxH="80vh"
                borderRadius="0 0 5px 5px"
                padding="0 0 5px 0"
            >

                {
                    !isFetching && queryResult?.map(e => (
                        <SearchResult onClick={() => handleOutSideclick} key={e.id} loseFocus={() => setOnFocus(false)} movie={e} />
                    ))
                }

            </Flex>}
        </Flex>
    )
}
