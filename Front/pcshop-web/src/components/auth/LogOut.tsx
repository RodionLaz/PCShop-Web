import React from "react";
import { useDispatch } from "react-redux";
import {clearAccount} from '../../state/user/userSlice';
const LogOut = () => {

    const dispatch = useDispatch();

    const handleLogout = () =>{

        localStorage.removeItem('loggedIn');
        dispatch(clearAccount());
        window.location.href = '/';
    }
    return(
        <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>LogOut</button>

    )
}

export default LogOut;