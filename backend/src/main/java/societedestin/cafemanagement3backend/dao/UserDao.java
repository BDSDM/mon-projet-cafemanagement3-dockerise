package societedestin.cafemanagement3backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import societedestin.cafemanagement3backend.pojo.User;

import java.util.Optional;

public interface UserDao extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

}
