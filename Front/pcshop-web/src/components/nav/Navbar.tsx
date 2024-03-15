import React, { useState } from "react";
import UserCard from "./UserCard";
import '../styles/Navbar.css'
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useDispatch } from "react-redux";
import {logIn,logOut} from '../../state/user/userSlice';



const Navbar = () =>{


        const GetLogedIn = useSelector((state:RootState) => state.user.login)
    
    const dispatch = useDispatch();
    const [loggedin,setLoggedin] = useState(false)

    const handleLogin = () => {
        dispatch(logIn())
        setLoggedin(GetLogedIn)
    } 
    const handleLogout = () => {
        dispatch(logOut())
        setLoggedin(GetLogedIn)
    } 
    return(
        <div className="Navbar-container">
        {!loggedin ? (
            <div>
                <a href="/Login" className="login">Login</a>
                <a href="/Shop" className="shop">Shop</a>
            </div>
        ) : (
            <div>
                <UserCard/>
            </div>
            
        )}
    </div>
    )
}
           
//                <button className="login" onClick={() => handleLogin()}>login</button>
export default Navbar;