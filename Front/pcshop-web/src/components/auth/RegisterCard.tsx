import React, { useState } from "react";


const RegisterCard = () =>{

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const HandleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }
    const HandlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    return(
        <div className="Login-container">
            <form className="login form">
                <input 
                value={username}
                onChange={HandleUsernameChange}
                type="text"
                defaultValue={""}
                > Username</input>  

                <input 
                value={username}
                onChange={HandlePasswordChange}
                type="text"
                defaultValue={""}
                > Password</input>  
                <button type="submit"></button>
            </form>
     
        </div>
    )
}

export default RegisterCard;
