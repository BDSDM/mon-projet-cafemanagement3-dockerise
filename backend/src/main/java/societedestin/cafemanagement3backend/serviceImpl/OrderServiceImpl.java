package societedestin.cafemanagement3backend.serviceImpl;

import societedestin.cafemanagement3backend.dao.OrderDao;
import societedestin.cafemanagement3backend.dao.UserDao;
import societedestin.cafemanagement3backend.pojo.Order;
import societedestin.cafemanagement3backend.pojo.User;
import societedestin.cafemanagement3backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import societedestin.cafemanagement3backend.util.EmailUtil;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderDao orderDao;
    @Autowired
    private UserDao userDao;

    @Override
    public Order createOrder(Long userId, Order order) {
        User user = userDao.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable avec l'id : " + userId));
        order.setUser(user);
        return orderDao.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderDao.findAll();
    }

    @Override
    public Order getOrderById(Long id) {
        return orderDao.findById(id).orElse(null);
    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        return orderDao.findByUserId(userId);
    }

    @Override
    public Order updateOrder(Order order) {
        return orderDao.save(order);
    }

    @Override
    public void deleteOrder(Long id) {
        orderDao.deleteById(id);
    }

    @Autowired
    private EmailUtil emailUtil;

    @Override
    public void validateOrdersByUser(Long userId) {
        // Récupérer les commandes de l'utilisateur
        List<Order> orders = orderDao.findByUserId(userId);

        if (orders.isEmpty()) {
            throw new RuntimeException("Aucune commande trouvée pour cet utilisateur.");
        }

        // Récupérer l'utilisateur pour récupérer son email
        User user = userDao.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Mettre à jour le statut des commandes
        for (Order order : orders) {
            order.setStatus("VENDU");
        }

        // Sauvegarder les commandes mises à jour
        orderDao.saveAll(orders);

        // Optionnel : construire une liste des produits vendus
        StringBuilder body = new StringBuilder("Vos commandes suivantes ont été validées :\n\n");
        for (Order order : orders) {
            body.append("- ").append(order.getName()).append("\n");
        }

        // Envoyer l'email à l'utilisateur
        emailUtil.sendEmail(
                user.getEmail(), // Utilise l'email de l'utilisateur récupéré
                "Validation de vos commandes",
                body.toString()
        );
    }

}
