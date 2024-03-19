import React,{useEffect} from "react";
import ProductCard from "./ProductCard";
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from "axios";


const ShopPage = () =>{
    
interface productsInterface {

    title:string
    description:string
    price:string
    id:string
}
    const products:productsInterface[] = [
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
    const getProducts = async () =>{
        const response:AxiosResponse = await axios.post("http://localhost:8080/Api/Shop/GetAllproucs")
        if(response.status=200){
            products.push(response.data)
        }
    }
    useEffect(() => {
        //getProducts();
    }, []);
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
