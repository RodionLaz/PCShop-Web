package com.example.backend.Auth;
import com.example.backend.Auth.UserModel;
import java.util.Map;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ExceptionDepthComparator;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import ch.qos.logback.classic.net.SyslogAppender;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;



@RestController
public class AuthController {
    @Autowired
    private AuthService authService;


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/Register")
    public ResponseEntity<?> putMethodName(@RequestBody Map<String, Object> requestData) {
      try {
            String username = (String) requestData.get("username");
            String password = (String) requestData.get("password");

            Document user = authService.createUser(username, password).block();
            return ResponseEntity.ok(user);
      } catch (Exception e) {
            System.err.println("ERROR from AuthController : " +  e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
      }
    }


    @PostMapping ("/Login")
    public ResponseEntity<?> loginController(@RequestBody UserModel request){
        try{
            String username = request.getUsername();
            String password = request.getPassword();
  
            Document user = authService.authenticate(username, password).block();
            return ResponseEntity.ok(user);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        
    }
}
