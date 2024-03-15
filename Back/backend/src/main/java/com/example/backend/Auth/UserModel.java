package com.example.backend.Auth;

import org.springframework.data.annotation.Id;

public abstract class UserModel {
    @Id
    private String _id;
    private String username,password;
    
    public UserModel(){}
    public UserModel(String _id ,String username,String password){
        this._id=_id;
        this.username = username;
        this.password = password;
    }
    public String getId(){
        return _id;
    }
    public void setId(String _id){
        this._id = _id;
    }
    public String getusername(){
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
}
