import React, { useState } from 'react';
import '../styles/AddProduct.css'
import axios, { AxiosResponse } from 'axios';

const AddProduct = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');


    const handleTitleChange = (e:any) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e:any) => {
        setDescription(e.target.value);
    }

    const handlePriceChange = (e:any) => {
        setPrice(e.target.value);
    }


    const handleSubmit = async() => {
        let data = {
            title:title,
            description:description,
            price:description,
            username:"Unkown"
        }
        try{

    
            if(localStorage.getItem("loggedIn") != undefined){
                const username = localStorage.getItem("username");
                if (username !== null) {
                data.username = username.toString();
                }
            }
            const response:AxiosResponse = await axios.put("http://localhost:8080//Api/Shop/InsertProduct",data)
            if(response.status==200){
                console.log(response)
            }else{
                console.log(response)
            }
        }catch(e){
            console.error(e);
        }
    }

    return (
        <div className="CreateProduct-container">
            <h2>Create Product</h2>
            <div className="form-container">
                <input className="input-field" placeholder="Enter Title" value={title} onChange={handleTitleChange}></input>
                <input className="input-field" placeholder="Enter Description" value={description} onChange={handleDescriptionChange}></input>
                <input className="input-field" placeholder="Enter Price" value={price} onChange={handlePriceChange}></input>
                <button className="create-button" onClick={handleSubmit}>Create</button>
            </div>
        </div>
    );
}

export default AddProduct;
