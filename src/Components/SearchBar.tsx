import React, { useEffect, useRef, useState } from 'react'
import { Input, Flex } from "@chakra-ui/react";
import SearchResult from './SearchResult';
import { useLazyGetMoviesQuery } from '../state/movieApiSlice';
import { Movie } from '../types';

export default function SearchBar({ movie }: { movie: Movie | null }) {

    const [isOpen, setOpen] = useState<boolean>(false)
    const [trigger, { isLoading, isError, data, error }] = useLazyGetMoviesQuery();
    const [onFocus, setOnFocus] = useState<boolean>(false);
    const [queryResult, setQueryResult] = useState<Array<Movie>>([]);

    useEffect(() => {
        console.log(queryResult)
    }, [queryResult])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.value === "") setQueryResult([])
        else {
            trigger(e.target.value).then(res => {
                if (res.data) {
                    setQueryResult(res.data
                        .results
                        .filter(e => e.poster_path)
                    /*.sort((a, b) => b?.vote_count - a?.vote_count)*/)
                }
            });
        }
    }

    return (
        <Flex
            position="relative"
            maxWidth="800px"
            mx="auto"
        >
            <Input
                //onBlur={() => setOnFocus(false)}
                onFocus={() => setOnFocus(true)}
                maxW="100%"
                //width={isOpen ? '100%' : '0px'}
                color="white"
                type="text"
                variant="outline"
                onChange={onChange}
                placeholder="Start typing"
                _placeholder={{ opacity: 1, color: 'gray.500' }}
                transition="width 1s"
            />

            {onFocus && queryResult.length > 0 && <Flex
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
                    !isLoading && queryResult?.map(e => (
                        <SearchResult key={e.id} loseFocus={() => setOnFocus(false)} movie={e} />
                    ))}

            </Flex>}
        </Flex>
    )
}