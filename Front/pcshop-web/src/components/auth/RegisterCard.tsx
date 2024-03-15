import React, { useState } from "react";


interface RegisterCardProps {
    logOrRegPage: boolean;
    handleLoginOrNot: (logOrRegPage: boolean) => void;
}

const RegisterCard = ({ handleLoginOrNot, logOrRegPage }: RegisterCardProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        // Logic for handling form submission
    }

    const handleLoginClick = () => {
        handleLoginOrNot(!logOrRegPage); // Toggle the login/register page state
    }

    return (
        <div className="register-card">
            <h1>Register</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <input 
                    className="register-input"
                    value={username}
                    onChange={handleUsernameChange}
                    type="text"
                    placeholder="Username"
                />
                <input 
                    className="register-input"
                    value={password}
                    onChange={handlePasswordChange}
                    type="password"
                    placeholder="Password"
                />
                <button className="register-btn" type="submit">Register</button>
            </form>
            <div className="register-text">Have an account already? <button className="login-link" onClick={handleLoginClick}>Login</button></div>
        </div>
    );
}

export default RegisterCard;
