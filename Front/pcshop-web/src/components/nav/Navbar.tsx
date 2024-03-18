import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import '../nav/Navbar.css'
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useDispatch } from "react-redux";
import {logIn,logOut} from '../../state/user/userSlice';
import LogOut from "../auth/LogOut";
import { RiLoginBoxLine, RiLogoutBoxLine, RiShoppingCartLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';


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
          <div className="login-container">
            <a href="/Login" className="nav-link">
              <RiLoginBoxLine className="nav-icon" /> Login
            </a>
          </div>
        ) : (
          <div className="logged-in-container">
            <div className="logout-container">
                <div className="logout-button"><LogOut/></div>
              <div className="user-card"><UserCard /></div>
              
            </div>
            <div className="shop-container">
              <a href="/Shop" className="nav-link">
                <RiShoppingCartLine className="nav-icon" /> Shop
              </a>
            </div>
          </div>
        )}
      </div>
    )
}
           
//                <button className="login" onClick={() => handleLogin()}>login</button>
export default Navbar;