package com.example.backend.Auth;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import org.mindrot.jbcrypt.BCrypt;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoCollection;
import com.mongodb.reactivestreams.client.MongoDatabase;
import com.mongodb.client.model.Filters;

import reactor.core.publisher.Mono;

@Service
public class AuthService {


    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    private final AuthInterface authInterface;
    
    @Autowired()
    public AuthService(AuthInterface authInterface) {
        this.authInterface = authInterface;
    }

    public Mono<Document> createUser(String username, String password) {
        return Mono.from(createUserAsync(username, password));
    }

    private Mono<Document> createUserAsync(String username, String password) {
        return Mono.fromCallable(() -> {
            try (MongoClient mongoClient = MongoClients.create(mongoUri)) {
                MongoDatabase database = mongoClient.getDatabase("PCShopDB");
                MongoCollection<Document> collection = database.getCollection("PCShopCollection");

                if(!checkIfUserExsitsAsync(username).block()){
                
                    String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());

                    ObjectId _id = new ObjectId();
                    Document newUser = new Document()
                            .append("_id", _id)
                            .append("username", username)
                            .append("password", hashedPassword)
                            .append("admin", false)
                            .append("cart", new Document("items", new Document()));
    
                    collection.insertOne(newUser); 
                    return  newUser;
                }
                else{
                    throw new RuntimeException("User Already Exists");
                }

            } catch (Exception e) {
                System.err.println("THE Error : " +  e.getMessage());
            }
            return null;
        });
    }

    public Mono<Boolean> checkIfUserExsitsAsync(String username){
        return Mono.fromCallable(() -> checkIfUserExists(username));
    }
    private boolean checkIfUserExists(String username) {
        try (MongoClient mongoClient = MongoClients.create(mongoUri)) {
            MongoDatabase database = mongoClient.getDatabase("PCShopDB");
            MongoCollection<Document> collection = database.getCollection("PCShopCollection");
            Document query = new Document("username", username);
            Document user = (Document) collection.find(query).first();
            return user != null;
        } catch (Exception e) {
            e.printStackTrace();
            return true; 
        }
    }

    public Mono<Document> authenticate(String username, String password) {
        return authenticateAsync(username, password);
    }
    
    private Mono<Document> authenticateAsync(String username, String password) {
        return Mono.fromCallable(() -> {
            try (MongoClient mongoClient = MongoClients.create(mongoUri)) {
                MongoDatabase database = mongoClient.getDatabase("PCShopDB");
                MongoCollection<Document> collection = database.getCollection("PCShopCollection");
    
                // Find a user with the matching username
                Document query = new Document("username", username);
                return Mono.from(collection.find(query).first()).flatMap(user -> {
                    if (user != null) {
                        String storedHashedPassword = user.getString("password");
                        if (BCrypt.checkpw(password, storedHashedPassword)) {
                            return Mono.just(user);
                        } else {
                            return Mono.error(new RuntimeException("Password Incorrect"));
                        }
                    } else {
                        return Mono.error(new RuntimeException("User Doesn't Exist"));
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
                return Mono.error(new RuntimeException("Error occurred"));
            }
        }).flatMap(result -> (Mono<Document>) result);
    }
    
}
