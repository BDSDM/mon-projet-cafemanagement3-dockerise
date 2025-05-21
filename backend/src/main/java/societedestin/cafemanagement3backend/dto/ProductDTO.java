package societedestin.cafemanagement3backend.dto;

public class ProductDTO {
    private String name;
    private Long price;
    private Long userId; // 🔥 Correspond à la clé étrangère

    public ProductDTO() {}

    public ProductDTO(String name, Long price, Long userId) {
        this.name = name;
        this.price = price;
        this.userId = userId;
    }

    // Getters & Setters
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }
    public void setPrice(Long price) {
        this.price = price;
    }

    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
