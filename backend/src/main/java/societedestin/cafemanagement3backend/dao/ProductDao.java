package societedestin.cafemanagement3backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import societedestin.cafemanagement3backend.pojo.Product;

import java.util.List;

public interface ProductDao extends JpaRepository<Product, Long> {
    List<Product> findByUserId(Long userId);
}
