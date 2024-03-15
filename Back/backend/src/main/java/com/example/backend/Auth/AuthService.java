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
    private final AuthInterface authInterface;

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @Autowired
    public AuthService(AuthInterface authInterface){
        this.authInterface = authInterface;
    }

    public Mono<Void> createUser(String username, String password) {
        return Mono.from(createUserAsync(username, password));
    }

    private Mono<Void> createUserAsync(String username, String password) {
        return Mono.fromCallable(() -> {
            try (MongoClient mongoClient = MongoClients.create(mongoUri)) {
                MongoDatabase database = mongoClient.getDatabase("PCShopDB");
                MongoCollection<Document> collection = database.getCollection("PCShopCollection");

                String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());

                ObjectId _id = new ObjectId();
                Document newUser = new Document()
                        .append("_id", _id)
                        .append("username", username)
                        .append("password", hashedPassword)
                        .append("admin", false)
                        .append("cart", new Document("items", new Document()));

                collection.insertOne(newUser); 
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
            return null;
        });
    }

    public Mono<Boolean> authenticate(String username, String password) {
        return Mono.from(authenticateAsync(username, password));
    }

    private Mono<Boolean> authenticateAsync(String username, String password) {
        return Mono.fromCallable(() -> {
            try (MongoClient mongoClient = MongoClients.create(mongoUri)) {
                MongoDatabase database = mongoClient.getDatabase("PCShopDB");
                MongoCollection<Document> collection = database.getCollection("PCShopCollection");

                // Find a user with the matching username
                Document query = new Document("username", username);
                Mono<Document> resultMono = (Mono<Document>) collection.find(query).first();

                // Check if a user is found
                Document user = resultMono.block();
                if (user != null) {
                    String storedHashedPassword = user.getString("password");

                    // Validate password (assuming you use BCrypt for hashing)
                    if (BCrypt.checkpw(password, storedHashedPassword)) {
                        // Login successful!
                        return true;
                    } else {
                        // Password mismatch
                        return false;
                    }
                } else {
                    // Username not found
                    return false;
                }
            } catch (Exception e) {
                // Handle connection or other errors
                e.printStackTrace();
                return false;
            }
        });
    }
}
