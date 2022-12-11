import { useAppSelector, useAppDispatch } from './state/store';
import { useRegisterMutation, useLoginMutation } from './state/authApiSlice';
import React, { useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { setCredentials } from './state/authSlice';
import { useNavigate } from 'react-router';

interface form {
    email: string,
    password: string
}

const initialState: form = {
    "email": "",
    "password": ""
}


export default function Login() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [loginFn] = useLoginMutation();

    const [formInput, setFormInput] = useState<form>(
        {
            "email": "bufer99@gmail.com",
            "password": "12345"
        }
    );

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormInput((formInput) => {
            return {
                ...formInput,
                [e.target.id]:e.target.value
            }
        }
        )
    }


    const onClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        
        try {
            const result = await loginFn({ email: formInput.email, password: formInput.password });
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
        <form>
            <input id='email' value={formInput.email} onChange={onChange} type="text" />
            <input id='password' value={formInput.password} onChange={onChange} type="text" />
            <button onClick={onClick}>LOGIN</button>
        </form>
    )
}