package com.example.backend.Auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
public class AuthController {

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/Register")
    public ResponseEntity<String> putMethodName(@RequestBody String RequestBody) {

        
        return ResponseEntity.ok("User created");
    }
}
