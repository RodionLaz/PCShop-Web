import React, { useState } from "react";


const LoginCard = () =>{
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const handleSubmit = () => {

    }
    return(
        <div className="Login-container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    className="username-input"
                    value={username}
                    onChange={handleUsernameChange}
                    type="text"
                    placeholder="Username"
                />
                <input
                    className="password-input"
                    value={password}
                    onChange={handlePasswordChange}
                    type="password"
                    placeholder="Password"
                />
                <button  className="submitbtn" type="submit">Login</button>
            </form>
            <div className="downtext">dont have account yet ? <button className="registerbtn">Register</button></div>
     
        </div>
    )
}

export default LoginCard;
