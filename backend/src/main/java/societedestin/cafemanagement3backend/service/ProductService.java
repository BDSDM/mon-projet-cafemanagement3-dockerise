package societedestin.cafemanagement3backend.service;

import societedestin.cafemanagement3backend.dto.ProductDTO;
import societedestin.cafemanagement3backend.pojo.Product;

import java.util.List;

public interface ProductService {

    Product createProduct(ProductDTO productDTO);

    Product getProductById(Long id);

    List<Product> getAllProducts();

    List<Product> getProductsByUserId(Long userId);

    Product updateProduct(Long id, Product updatedProduct);

    void deleteProduct(Long id);
}
