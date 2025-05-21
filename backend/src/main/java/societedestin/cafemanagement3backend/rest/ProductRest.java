package societedestin.cafemanagement3backend.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import societedestin.cafemanagement3backend.pojo.Product;
import societedestin.cafemanagement3backend.dto.ProductDTO;

import java.util.List;

@RequestMapping("/products")
public interface ProductRest {

    @PostMapping
    ResponseEntity<Product> createProduct(@RequestBody ProductDTO productDTO);

    @GetMapping("/{id}")
    ResponseEntity<Product> getProductById(@PathVariable Long id);

    @GetMapping
    ResponseEntity<List<Product>> getAllProducts();

    @GetMapping("/user/{userId}")
    ResponseEntity<List<Product>> getProductsByUserId(@PathVariable Long userId);

    @PutMapping("/{id}")
    ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO);

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteProduct(@PathVariable Long id);
}
