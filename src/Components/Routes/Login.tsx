import { useAppSelector, useAppDispatch } from '../../state/store';
import { useRegisterMutation, useLoginMutation } from '../../state/authApiSlice';
import React, { useState } from 'react';
import { Button, Input, Spinner } from '@chakra-ui/react';
import { setCredentials } from '../../state/authSlice';
import { useNavigate } from 'react-router';

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

    const [formInput, setFormInput] = useState<Form>(
        {
            "email": "bufer99@gmail.com",
            "password": "12345"
        }
    );

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
                //setError(true)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <form>
                <input id='email' value={formInput.email} onChange={onChange} type="text" />
                <input id='password' value={formInput.password} onChange={onChange} type="text" />
                <button onClick={onClick}>LOGIN</button>
            </form>
            {isLoading && <Spinner />}
        </>
    )
}