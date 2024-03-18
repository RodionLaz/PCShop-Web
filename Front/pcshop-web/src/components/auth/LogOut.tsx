import React from "react";
import { useDispatch } from "react-redux";
import {clearAccount} from '../../state/user/userSlice';
import { RiLoginBoxLine, RiLogoutBoxLine, RiShoppingCartLine } from 'react-icons/ri';

const LogOut = () =>{
    const dispatch = useDispatch();
    const handlelogot=()=>{
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        dispatch(clearAccount());
        window.location.href = '/';
    }
    return(
        <button
        onClick={handlelogot}
            style={{
                border: "none",
                background: "none",
                padding: 0,
                cursor: "pointer", 
            }}
            >
            <RiLogoutBoxLine className="nav-icon" />
        </button>
          

    )


}

export default LogOut;