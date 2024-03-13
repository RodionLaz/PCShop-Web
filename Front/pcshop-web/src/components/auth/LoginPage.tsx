import React, { useState } from "react";
import LoginCard from "./LoginCard";
import '../styles/LoginPage.css'



const LoginPage = () =>{

    const [login,setLogin] = useState(true);

    const handleLoginOrNot = () => {
        setLogin(!login)
    }
    

    return(
        <div className="Login-card-container">

            <LoginCard/>
        </div>
    );
}


export default LoginPage;
