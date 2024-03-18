import React, { useState } from "react";
import '../styles/ProductCard.css'
import { useDispatch } from "react-redux";


interface Product {
    title: string;
    description: string;
    price: string;
    id: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard = (props: ProductCardProps) => {
    const cart = [
        {
            items:{
                "123":1
            }
        }

    ]
    const handleAddToCart = (id:string) =>{
        useDispatch()

    }
    const { title, description, price } = props.product;
    return(
        <div className="product-container">
            <h3 className="product-title">{title}</h3>
            <div className="product-description">{description}</div>
            <div className="product-price">{price}</div>
            <button className="buy" >Add to cart</button>
        </div>
    )
}

export default ProductCard;