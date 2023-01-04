import { Button, Menu, MenuButton, MenuGroup, MenuList, MenuItem, useMediaQuery, IconButton } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAppSelector, useAppDispatch } from "../state/store"
import { logout } from "../state/authSlice"
import Login from "./Routes/Login";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setMovie } from "../state/movieSlice";
import { useNavigate } from "react-router-dom";

export default function UserMenu() {

    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();

    const [isMobile] = useMediaQuery('(max-width: 425px)');
    const [isLogin, setIsLogin] = useState(false);


    if (user) return (
        <Menu>
            <MenuButton
                as={isMobile ? IconButton : Button}
                icon={<HamburgerIcon />}
            >
                Account
            </MenuButton>
            <MenuList>
                <MenuGroup title={user.name}>
                    <MenuItem><Link style={{ width: "100%" }} to="/movies">Reviews</Link></MenuItem>
                    <MenuItem><Link style={{ width: "100%" }} to="/">Browse movies</Link></MenuItem>
                    {
                        user?.isAdmin
                            ?
                            <MenuItem><Link style={{ width: "100%" }} to="/admin">Admin</Link></MenuItem>
                            :
                            null
                    }
                    <MenuItem onClick={() => {
                        dispatch(logout());
                        dispatch(setMovie(null));
                        navigate("/");
                        //Login bug
                        setIsLogin(false);

                    }} >Logout</MenuItem>

                </MenuGroup>
            </MenuList >
        </Menu >
    )
    else return (
        <Fragment>
            <Button onClick={() => setIsLogin(true)}>Sign in</Button>
            <Login isOpen={isLogin} onClose={() => setIsLogin(false)} />
        </Fragment>
    )
}