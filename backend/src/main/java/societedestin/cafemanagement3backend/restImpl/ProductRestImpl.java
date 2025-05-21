package societedestin.cafemanagement3backend.restImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import societedestin.cafemanagement3backend.pojo.Product;
import societedestin.cafemanagement3backend.pojo.User;
import societedestin.cafemanagement3backend.rest.ProductRest;
import societedestin.cafemanagement3backend.service.ProductService;
import societedestin.cafemanagement3backend.dao.UserDao;
import societedestin.cafemanagement3backend.dto.ProductDTO;

import java.util.List;
import java.util.Optional;

@RestController
public class ProductRestImpl implements ProductRest {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserDao userDao;

    @Override
    public ResponseEntity<Product> createProduct(ProductDTO productDTO) {
        Optional<User> optionalUser = userDao.findById(productDTO.getUserId());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().build(); // ou ResponseEntity.notFound().build();
        }

        Product product = new Product();
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setUser(optionalUser.get());

        Product saved = productService.createProduct(productDTO);
        return ResponseEntity.ok(saved);
    }

    @Override
    public ResponseEntity<Product> getProductById(@PathVariable("id") Long id) {
        Product product = productService.getProductById(id);
        return (product != null) ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @Override
    public ResponseEntity<List<Product>> getProductsByUserId(Long userId) {
        return ResponseEntity.ok(productService.getProductsByUserId(userId));
    }

    @Override
    public ResponseEntity<Product> updateProduct(@PathVariable("id") Long id, ProductDTO productDTO) {
        Optional<User> optionalUser = userDao.findById(productDTO.getUserId());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Product product = new Product();
        product.setId(id); // important
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setUser(optionalUser.get());

        Product updated = productService.updateProduct(id, product);
        return (updated != null) ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
