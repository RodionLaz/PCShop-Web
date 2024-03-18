package com.example.backend.Shop;

import org.springframework.data.annotation.Id;
import org.springframework.stereotype.Component;


@Component
public abstract class ProductModel {
    @Id
    String id;
    
    String title,description,price;
    public String getId(){
        return this.id;
    }
    public void setId (String Id){
        this.id = Id;
    }
    public String getTitle (){
        return this.title;
    }
    public void setTitle(String title){
        this.title =title; 
    }
    public String getDescription (){
        return this.description;
    }
    public void setDescription (String description){
        this.description= description;
    }
    public String getPrice (){
        return this.price;
    }
    public void setPrice(String price){
        this.price = price;
    }
}
