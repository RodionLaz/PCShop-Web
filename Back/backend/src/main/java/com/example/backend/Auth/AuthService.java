package com.example.backend.Auth;

import java.util.Collection;

import org.bson.Document;
import org.bson.codecs.CollectibleCodec;
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
import com.mongodb.client.result.InsertOneResult;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Service
public class AuthService {


    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    private final AuthInterface authInterface;
    private final MongoClient mongoClient;

    @Autowired
    public AuthService(AuthInterface authInterface, MongoClient mongoClient) {
        this.authInterface = authInterface;
        this.mongoClient = mongoClient;
    }

    public Mono<Document> createUser(String username, String password) {
            return createUserAsync(username, password)
            .flatMap(newUser -> Mono.just(newUser))
            .onErrorResume(error -> Mono.error(new RuntimeException("Error creating user: " + error)));
    }

    private Mono<Document> createUserAsync(String username, String password) {
        return checkIfUserExistsAsync(username)
                .flatMap(userExists -> {
                    if (userExists) {
                        return Mono.error(new RuntimeException("User Already Exists"));
                    }

                    try{
                        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
                        ObjectId _id = new ObjectId();

                        Document newUser = new Document()
                                .append("_id", _id)
                                .append("username", username)
                                .append("password", hashedPassword)
                                .append("admin", false)
                                .append("cart", new Document("items", new Document()));

                        MongoDatabase database = mongoClient.getDatabase("PCShopDB");
                        MongoCollection<Document> collection = database.getCollection("PCShopCollection");
                        return Mono.from(collection.insertOne(newUser)).thenReturn(newUser);
                    
                    } catch (Exception e) {
                        System.err.println("ERROR from AuthService : " + e);
                        return Mono.error(e);
                    }
                });
    }
    
    
    

    public Mono<Boolean> checkIfUserExistsAsync(String username) {
        return Mono.fromCallable(() -> checkIfUserExists(username))
                   .subscribeOn(Schedulers.boundedElastic());
    }
    //returns true if user already exsits with the same username 
    private boolean checkIfUserExists(String username) {
        try{
        
            MongoDatabase database = mongoClient.getDatabase("PCShopDB");
            MongoCollection<Document> collection = database.getCollection("PCShopCollection");
            
            Document query = new Document("username", username);
            Mono<Document> userMono = Mono.from(collection.find(query).first());

            return userMono.map(doc -> doc != null).blockOptional().orElse(false);
           
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("THE Error : " + e.getMessage());
            return true; 
        }
    }

   // public Mono<Document> authenticate(String username, String password) {
    //   return authenticateAsync(username, password);
    //}
    public Mono<Document> authenticate(String username, String password) {
        MongoDatabase database = mongoClient.getDatabase("PCShopDB");
        MongoCollection<Document> collection = database.getCollection("PCShopCollection");
        Document query = new Document("username", username);
    
        return Mono.from(collection.find(query).first())
                .flatMap(doc -> {
                    if (doc != null) {
                        String storedHashedPassword = doc.getString("password");
                        if (BCrypt.checkpw(password, storedHashedPassword)) {
                            return Mono.just(doc);
                        } else {
                            return Mono.error(new RuntimeException("Password Incorrect"));
                        }
                    } else {
                        return Mono.error(new RuntimeException("User Doesn't Exist"));
                    }
                });
    }
    
    public Mono<Document> authenticateAsync(String username, String password) {
        return Mono.fromCallable(() -> {
            MongoDatabase database = mongoClient.getDatabase("PCShopDB");
            MongoCollection<Document> collection = database.getCollection("PCShopCollection");
    
            Document query = new Document("username", username);
            return collection.find(query).first();
        }).flatMap(result -> {
            if (result instanceof Document) {
                Document user = (Document) result;
                if (BCrypt.checkpw(password, user.getString("password"))) {
                    return Mono.just(user);
                }
            }
            return Mono.error(new RuntimeException("Authentication failed")); 
        });
    }
    
    
    private Mono<Document> authenticateAsync2(String username, String password) {
        return Mono.fromCallable(() -> {
            try {
                MongoDatabase database = mongoClient.getDatabase("PCShopDB");
                MongoCollection<Document> collection = database.getCollection("PCShopCollection");

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
