import React, { useEffect, useRef, useState } from 'react'
import { Input, Flex } from "@chakra-ui/react";
import SearchResult from './SearchResult';
import { useLazyGetMoviesQuery } from '../state/movieApiSlice';
import { Movie } from '../types';

export default function SearchBar() {

    const [isOpen, setOpen] = useState<boolean>(false)
    const [trigger, { isLoading, isError, data, error }] = useLazyGetMoviesQuery();
    const [onFocus, setOnFocus] = useState<boolean>(false);
    const [queryResult, setQueryResult] = useState<Array<Movie>>([]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        trigger(e.target.value).then(response => {
            if (data) {
                setQueryResult(data
                    .results
                    .filter(e => e.poster_path)
                    .sort((a, b) => b?.vote_count - a?.vote_count))
            }
        });
    }

    /*
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 2) {
            //console.log(e.target.value)
            trigger(e.target.value)
                .then((res) => setQueryResult(
                    (res) => {
                        return res
                            .data
                            .results
                            .filter(e => e.poster_path)
                            .sort((a, b) => b.vote_count - a.vote_count)
                    }
                ));
        } else {
            setQueryResult([])
        }
    }
*/

    return (
        <Flex>
            <Input
                onBlur={() => setOnFocus(false)}
                onFocus={() => setOnFocus(true)}
                position="relative"
                maxW="100%"
                //width={isOpen ? '100%' : '0px'}
                type="text"
                onChange={onChange}
                placeholder="SEARCH"
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
                maxH="815px"
                borderRadius="0 0 5px 5px"
                padding="0 0 5px 0"
            >

                {
                !isLoading && queryResult?.map(e => (
                    <SearchResult key={e.id} {...e} />
                ))}

            </Flex>}
        </Flex>
    )
}