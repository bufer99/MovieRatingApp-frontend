import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    created_at: string,
    email: string,
    id: number,
    name: string,
    updated_at: string
}

interface Auth {
    user: User | null,
    token: string | null
}

const slice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null } as Auth,
    reducers: {
        setCredentials: (
            state: Auth,
            action: PayloadAction<Auth>
        ) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logout: (state) => {
            console.log("OUT")
            state.user = null
            state.token = null
        }
    },
})

export const { setCredentials, logout } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: any) => state ? state.auth ? state.auth.user : null : null;
export const selectCurrentToken = (state: any) => state ? state.auth ? state.auth.token : null : null;