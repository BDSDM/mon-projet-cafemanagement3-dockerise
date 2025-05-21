package societedestin.cafemanagement3backend.restImpl;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import societedestin.cafemanagement3backend.pojo.Order;
import societedestin.cafemanagement3backend.rest.OrderRest;
import societedestin.cafemanagement3backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class OrderRestImpl implements OrderRest {

    @Autowired
    private OrderService orderService;
    @Override
    public ResponseEntity<String> validateOrdersByUser(@PathVariable("userId") Long userId) {
        orderService.validateOrdersByUser(userId);
        return ResponseEntity.ok("Commandes validées pour l'utilisateur !");
    }

    @Override
    public ResponseEntity<Order> createOrder(@PathVariable("userId") Long userId, Order order) {
        Order newOrder = orderService.createOrder(userId, order);
        return new ResponseEntity<>(newOrder, HttpStatus.CREATED);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @Override
    public Order getOrderById(Long id) {
        return orderService.getOrderById(id);
    }

    @Override
    public List<Order> getOrdersByUserId(@PathVariable("userId") Long userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @Override
    public Order updateOrder(Order order) {
        return orderService.updateOrder(order);
    }

    @Override
    public void deleteOrder(@PathVariable("id") Long id) {
        orderService.deleteOrder(id);
    }
}
