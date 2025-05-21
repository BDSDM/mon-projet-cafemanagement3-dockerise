package societedestin.cafemanagement3backend.service;

import societedestin.cafemanagement3backend.pojo.Order;
import java.util.List;

public interface OrderService {
    void validateOrdersByUser(Long userId);

    Order createOrder(Long userId, Order order);

    List<Order> getAllOrders();

    Order getOrderById(Long id);

    List<Order> getOrdersByUserId(Long userId);

    Order updateOrder(Order order);

    void deleteOrder(Long id);
}
