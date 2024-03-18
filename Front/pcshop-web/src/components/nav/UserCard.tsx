import React from 'react';
import '../styles/UserCard.css';

const UserCard = () => {
   
    const username = localStorage.getItem('username');

    return (
        <div className="userCard">
            <p>Hello, {username}!</p>
        </div>
    );
}

export default UserCard;