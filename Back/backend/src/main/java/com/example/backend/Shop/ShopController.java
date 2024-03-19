package com.example.backend.Shop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.Map;



@RestController
public class ShopController {

   @Autowired
    private ShopService shopService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/Api/Shop/GetAllproucs")
    public ResponseEntity<?> GetProducts(@RequestBody  Map<String, Object> request){
        
    return ResponseEntity.ok(shopService.getAllProducts());
    }

    @PutMapping("/Api/Shop/InsertProduct")
    public ResponseEntity<?> InsertProduct(@RequestBody Map<String, Object> request) {
        String title =(String)  request.get("title");
        String description =(String)  request.get("description");
        String price =(String)  request.get("price");
        String username = (String) request.get("username");
        shopService.insertProduct(title, description, price,username);
        return ResponseEntity.ok(":D");
    }
}
