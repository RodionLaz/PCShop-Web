package com.example.backend.Auth;

import org.springframework.data.annotation.Id;

public abstract class UserModel {
    @Id
    private String _id;
    private String username,password;
    private String[] cart;
    
    public UserModel(){}
    public UserModel(String _id ,String username,String password,String[] cart){
        this._id=_id;
        this.username = username;
        this.password = password;
        this.cart = cart;
    }
    public String getId(){
        return _id;
    }
    public void setId(String _id){
        this._id = _id;
    }
    public String getUsername(){
        return username;
    }
    public void setUsername(String username){
        this.username = username;
    }
    public String getPassword(){
        return password;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public String[] getCart(){
        return this.cart;
    }
    public void setCart(String[] cart){
        this.cart= cart;
    }
}
