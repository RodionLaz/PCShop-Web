import React, { useState } from "react";
import axios,{ AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useDispatch } from "react-redux";
import {logIn,saveUsername} from '../../state/user/userSlice';
import { couldStartTrivia } from "typescript";



interface RegisterCardProps {
    logOrRegPage: boolean;
    handleLoginOrNot: (logOrRegPage: boolean) => void;
}

const RegisterCard = ({ handleLoginOrNot, logOrRegPage }: RegisterCardProps) => {
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
            password:password,
        }
        try{
            const response : AxiosResponse = await axios.post("http://localhost:8080/Register",data)
            if(response.status==200){
            console.log("User created")
            console.log(response)
            console.log(response.data)
            dispatch(logIn())
            dispatch(saveUsername(response.data.username))
            window.location.href = '/Shop';
            localStorage.setItem('loggedIn', JSON.stringify(true));
            }
            else{
                console.log(response);
            }
        }catch(e){
            console.error(e)

        }
    }

    const handleLoginClick = () => {
        handleLoginOrNot(!logOrRegPage); 
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
