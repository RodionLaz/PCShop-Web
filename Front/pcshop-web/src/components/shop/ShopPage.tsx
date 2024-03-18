import React from "react";
import ProductCard from "./ProductCard";
import { Link } from 'react-router-dom';


const ShopPage = () =>{

    const products = [
        {
            title:"rtx",
            description:"good stuff",
            price:"9000 USD",
            id:"1"
        },
        {
            title:"amd",
            description:"bad stuff",
            price:"4 USD",
            id:"2"
        },
    ]
    
    return(
        <div>
            <Link to="/AddProduct" className="add-product-link">Add product</Link>
        <div className="shoPage-container">
        {products.map(product => (
            <div className="product">
            <ProductCard 
                key={product.id} 
                product={product}
            />
            </div>
        ))}
    </div>
    </div>
    )
}

export default ShopPage;
