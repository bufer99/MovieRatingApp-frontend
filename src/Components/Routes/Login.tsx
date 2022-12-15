import { toast, ToastContainer } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../../state/store';
import { useRegisterMutation, useLoginMutation } from '../../state/authApiSlice';
import React, { useState, useRef } from 'react';
import {
    Button,
    Container,
    Flex,
    Input,
    Spinner,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Modal,
    ModalOverlay,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure

} from '@chakra-ui/react';
import { setCredentials } from '../../state/authSlice';
import { useNavigate } from 'react-router';
import "react-toastify/dist/ReactToastify.css";

interface Form {
    email: string,
    password: string
}

const initialState: Form = {
    "email": "",
    "password": ""
}

interface Login {
    isLoading: boolean,
    fetchStarted: boolean,
}

export default function Login({ isOpen, onClose, forwardto }: { isOpen: boolean, onClose: () => void, forwardto?:string }) {

    //const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef(null)

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [loginFn] = useLoginMutation();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formInput, setFormInput] = useState<Form>({
        email: "bufer99@gmail.com",
        password: "12345"
    });
    const [formError, setFormError] = useState<boolean>(false)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {

        setFormInput((formInput) => {
            return {
                ...formInput,
                [e.target.id]: e.target.value
            }
        }
        )
    }


    const onClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await loginFn({ email: formInput.email, password: formInput.password });
            setIsLoading(false);
            if ("data" in result) {
                dispatch(setCredentials(result.data));
                if(forwardto) navigate(forwardto)
                else navigate("/movies")
            } else {
                setFormError(true);
                setFormInput(initialState);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Modal
            initialFocusRef={initialRef}
            isOpen={isOpen}
            onClose={() => {setFormError(false);onClose()}}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign in</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input isInvalid={formError}
                        placeholder="Email"
                        _placeholder={{
                            color: `${formError ? 'crimson' : ''}`
                        }} id="email" value={formInput.email} ref={initialRef} onChange={onChange} tabIndex={1}/>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Password</FormLabel>
                        <Input isInvalid={formError}
                        placeholder= "Password"
                        _placeholder={{
                            color: `${formError ? 'crimson' : ''}`
                        }} id="password" type={"password"} value={formInput.password} onChange={onChange} tabIndex={2}/>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme='blue'
                        mr={3}
                        onClick={onClick}
                    >
                        Sign in
                    </Button>
                    <Button onClick={() => {setFormError(false);onClose()}}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}



/**
 * 
 * <Container
            maxW={"300px"}
        >
            <form>
                <Flex
                    direction={"column"}
                    alignItems="center"
                    gap={"10px"}
                >
                    <Input
                        isInvalid={formError}
                        placeholder="Email"
                        _placeholder={{
                            color: `${formError ? 'crimson' : ''}`
                        }}

                        backgroundColor={"white"}
                        variant={"outline"}
                        id='email'
                        value={formInput.email}
                        onChange={onChange}
                        type="text"
                    />
                    <Input
                        isInvalid={formError}
                        placeholder= "Password"
                        _placeholder={{
                            color: `${formError ? 'crimson' : ''}`
                        }}

                        backgroundColor={"white"}
                        variant={"outline"}
                        id='password'
                        value={formInput.password}
                        onChange={onChange}
                        type="text" />
                    <Button
                        onClick={onClick}
                        w="50%"
                    >LOGIN</Button>
                </Flex>
            </form>
            <ToastContainer />
        </Container>
 */