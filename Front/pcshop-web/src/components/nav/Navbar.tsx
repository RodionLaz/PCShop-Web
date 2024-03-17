import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import '../styles/Navbar.css'
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useDispatch } from "react-redux";
import {logIn,logOut} from '../../state/user/userSlice';
import LogOut from "../auth/LogOut";



const Navbar = () =>{



    
    const dispatch = useDispatch();
    const [loggedIn, setLoggedIn] = useState(() => {
        // Retrieve login state from local storage
        const storedLoggedIn = localStorage.getItem('loggedIn');
        return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
    });


    return(
        <div className="Navbar-container">
        {!loggedIn ? (
            <div>
                <a href="/Login" className="login">Login</a>
                <a href="/Shop" className="shop">Shop</a>
            </div>
        ) : (
            <div>
                <LogOut/>
                <UserCard/>
            </div>
            
        )}
    </div>
    )
}
           
//                <button className="login" onClick={() => handleLogin()}>login</button>
export default Navbar;