package societedestin.cafemanagement3backend.dao;

import societedestin.cafemanagement3backend.pojo.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderDao extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
}
