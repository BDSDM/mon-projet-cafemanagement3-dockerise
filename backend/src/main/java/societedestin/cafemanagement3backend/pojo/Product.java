package societedestin.cafemanagement3backend.pojo;

import com.fasterxml.jackson.annotation.JsonBackReference; // Ajoutez cette importation
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference; // Ajoutez cette importation
import jakarta.persistence.*;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double price;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore// Gérer la sérialisation de la relation côté Product
    private User user;

    public Product() {}

    public Product(String name, double price, User user) {
        this.name = name;
        this.price = price;
        this.user = user;
    }

    // Getters & Setters
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    // Méthode pour récupérer le nom de l'utilisateur
    public String getUserName() {
        return user != null ? user.getName() : null; // Retourne le nom de l'utilisateur ou null si l'utilisateur est inexistant
    }
}
