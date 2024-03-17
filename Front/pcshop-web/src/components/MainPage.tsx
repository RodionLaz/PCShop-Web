import React from "react";
import './styles/MainPage.css'



const MainPage = () =>{
    return(

        <div className="main-page-container"> 


            <h1>Welcome to Our PC Shop</h1> 
            <h2>To accses the shop please <a href="/Login">Login/Register</a></h2> 
            <p>Explore our wide range of products and find the perfect components for your dream PC.</p> {/* Additional text */}
        </div>
    )
}

export default MainPage;
