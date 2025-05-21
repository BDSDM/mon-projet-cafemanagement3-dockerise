package societedestin.cafemanagement3backend.rest;

import org.springframework.http.ResponseEntity;
import societedestin.cafemanagement3backend.pojo.Order;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/order")
public interface OrderRest {
    @PutMapping("/validate/user/{userId}")
    ResponseEntity<String> validateOrdersByUser(@PathVariable Long userId);

    @PostMapping("/create/{userId}")
    ResponseEntity<Order> createOrder(@PathVariable Long userId, @RequestBody Order order);

    @GetMapping("/all")
    List<Order> getAllOrders();

    @GetMapping("/{id}")
    Order getOrderById(@PathVariable Long id);

    @GetMapping("/user/{userId}")
    List<Order> getOrdersByUserId(@PathVariable Long userId);

    @PutMapping("/update")
    Order updateOrder(@RequestBody Order order);

    @DeleteMapping("/delete/{id}")
    void deleteOrder(@PathVariable Long id);
}
