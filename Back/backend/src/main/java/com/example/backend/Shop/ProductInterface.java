package com.example.backend.Shop;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

@Component
public interface ProductInterface extends MongoRepository<ProductModel,String> {
    
}
