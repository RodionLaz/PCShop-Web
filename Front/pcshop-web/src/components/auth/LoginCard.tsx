import axios from "axios";
import React, { useState } from "react";
import { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useDispatch } from "react-redux";
import {logIn,saveUsername} from '../../state/user/userSlice';
import { couldStartTrivia } from "typescript";

interface LoginCardProps {
    logOrRegPage: boolean;
    handleLoginOrNot: (logOrRegPage: boolean) => void;
}

const LoginCard = ({ handleLoginOrNot, logOrRegPage }: LoginCardProps) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        
        const data = {
            username:username,
            password:password
        }
        try{
            console.log(data)
            const response : AxiosResponse = await axios.post("http://localhost:8080/Login",data)
            if(response.status==200){
                console.log("Logged in")
                console.log(response.data)
                dispatch(logIn())
                dispatch(saveUsername(response.data.username))
                localStorage.setItem('loggedIn', JSON.stringify(true));
                window.location.href = '/Shop';
            }
        }catch(e){
            console.error(e);
        }


    }

    const handleRegisterClick = () => {
        handleLoginOrNot(!logOrRegPage); // Toggle the login/register page state
    }

    return (
        <div className="login-card">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    className="login-input"
                    value={username}
                    onChange={handleUsernameChange}
                    type="text"
                    placeholder="Username"
                />
                <input
                    className="login-input"
                    value={password}
                    onChange={handlePasswordChange}
                    type="password"
                    placeholder="Password"
                />
                <button className="login-btn" type="submit">Login</button>
            </form>
            <div className="login-text">Don't have an account yet? <button className="register-link" onClick={handleRegisterClick}>Register</button></div>
        </div>
    );
}

export default LoginCard;
