import React from "react";
import '../styles/Navbar.css'

const Navbar = () =>{
    return(
        <div className="Navbar-container">
            <a href="/Login" className="login">Login</a>
            <a href="/Shop" className="shop">shop</a>
        </div>
    )
}

export default Navbar;