package com.example.backend.Shop;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import java.util.List;
import java.util.ArrayList;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

public class ShopService {
    
    private final ProductInterface productInterface;
    private final MongoClient mongoClient;

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @Autowired
    public ShopService(ProductInterface productInterface,MongoClient mongoClient){
        this.productInterface = productInterface;
        this.mongoClient = mongoClient;
    }

    public List<Document> getAllProducts(){
        List<Document> products = new ArrayList<>();
        try{

            MongoDatabase database = mongoClient.getDatabase("PCShopDB");
            MongoCollection collection = database.getCollection("ProductsCollection");

            
            try(MongoCursor<Document> cursor = collection.find().iterator()){
                while (cursor.hasNext()) {
                    Document document = cursor.next();
                    products.add(document);
                }
                
            }
            
        }catch(Exception e){
            System.err.println("error" + e.getMessage());
        }
        return products;
    }
    public List<Document> insertProduct(String title, String description , String price,String username){
        try{
        MongoDatabase database = mongoClient.getDatabase("PCShopDB");
        MongoCollection collection = database.getCollection("ProductsCollection");
        Document newProduct = new Document()
                                .append("title", title)
                                .append("description", description)
                                .append("price", price)
                                .append("username", username);

        
            collection.insertOne(newProduct);
            
        }catch(Exception e){
            System.err.println("error" + e.getMessage());
        }

        return getAllProducts();

    }

}
