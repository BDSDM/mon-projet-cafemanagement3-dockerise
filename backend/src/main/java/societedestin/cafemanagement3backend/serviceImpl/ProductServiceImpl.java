package societedestin.cafemanagement3backend.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import societedestin.cafemanagement3backend.dao.ProductDao;
import societedestin.cafemanagement3backend.dao.UserDao;
import societedestin.cafemanagement3backend.dto.ProductDTO;
import societedestin.cafemanagement3backend.pojo.Product;
import societedestin.cafemanagement3backend.pojo.User;
import societedestin.cafemanagement3backend.service.ProductService;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductDao productDao;

    @Autowired
    private UserDao userDao;

    @Override
    public Product createProduct(ProductDTO productDTO) {
        Optional<User> userOpt = userDao.findById(productDTO.getUserId());

        if (userOpt.isEmpty()) {
            throw new RuntimeException("Utilisateur non trouvé avec l'id : " + productDTO.getUserId());
        }

        Product product = new Product();
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setUser(userOpt.get()); // 🔥 lier le User

        return productDao.save(product);
    }

    @Override
    public Product getProductById(Long id) {
        return productDao.findById(id).orElse(null);
    }

    @Override
    public List<Product> getAllProducts() {
        return productDao.findAll();
    }

    @Override
    public List<Product> getProductsByUserId(Long userId) {
        return productDao.findByUserId(userId);
    }

    @Override
    public Product updateProduct(Long id, Product product) {
        if (productDao.existsById(id)) {
            product.setId(id);
            return productDao.save(product);
        }
        return null;
    }

    @Override
    public void deleteProduct(Long id) {
        productDao.deleteById(id);
    }
}
