import React, { useState } from "react";
import LoginCard from "./LoginCard";
import RegisterCard from "./RegisterCard";
import '../styles/LoginPage.css'





const LoginPage = ({}) =>{

    const [logOrRegPage,setLogOrRegPage] = useState(true);// true = login

    const handleLoginOrNot = () => {
        
        setLogOrRegPage(!logOrRegPage)
    }
    

    return(
        <div className="Login-card-container">
            {logOrRegPage ? (
            <LoginCard 
                logOrRegPage={logOrRegPage}
                handleLoginOrNot={handleLoginOrNot} />
            ) : 
            (
                <div>
                    <RegisterCard 
                        logOrRegPage={logOrRegPage}
                        handleLoginOrNot={handleLoginOrNot} />
                </div>
            ) }

        </div>
    );
}


export default LoginPage;
