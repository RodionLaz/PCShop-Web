package com.example.backend.Auth;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;



@Component
public interface AuthInterface extends MongoRepository<UserModel, String>{

    
} 
