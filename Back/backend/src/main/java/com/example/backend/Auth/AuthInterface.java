package com.example.backend.Auth;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface AuthInterface  extends MongoRepository<UserModel,String>{

    
} 
