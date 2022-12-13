import { Box, Button, Menu, MenuButton, MenuGroup, MenuList, MenuItem, MenuDivider, useMediaQuery, IconButton } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAppSelector, useAppDispatch } from "../state/store"
import { selectCurrentUser, logout } from "../state/authSlice"
import Login from "./Routes/Login";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserMenu() {

    const user = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    const [isMobile] = useMediaQuery('(max-width: 425px)');
    const [isLogin, setIsLogin] = useState(false);

    return (
        <Menu>
            <MenuButton
                as={isMobile ? IconButton : Button}
                icon={<HamburgerIcon />}
            >
                Account
            </MenuButton>
            <MenuList>

                {user ?
                    <MenuGroup>
                        <MenuItem><Link to="/movies">Reviews</Link></MenuItem>
                        <MenuItem><Link to="/">Browse movies</Link></MenuItem>
                        <MenuItem onClick={() => dispatch(logout())} >Logout</MenuItem>
                    </MenuGroup>
                    :
                    <MenuGroup>
                        <MenuItem onClick={() => setIsLogin(true)}>Sign in</MenuItem>
                        <Login isOpen={isLogin} close={() => setIsLogin(false)} />
                    </MenuGroup>}

            </MenuList >
        </Menu >
    )
}