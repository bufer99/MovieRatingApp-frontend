import { toast, ToastContainer } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../../state/store';
import { useRegisterMutation, useLoginMutation } from '../../state/authApiSlice';
import React, { useState } from 'react';
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


export default function Login() {

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
                console.log(result.data);
                dispatch(setCredentials(result.data));
                navigate("/movies")
            } else {
                setFormError(true);
                setFormInput(initialState);
                toast.error('Wrong credentials', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container
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
    )
}