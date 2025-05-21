package societedestin.cafemanagement3backend.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import societedestin.cafemanagement3backend.pojo.PasswordResetToken;
import societedestin.cafemanagement3backend.pojo.User;

import java.util.Optional;

public interface PasswordResetTokenDao extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    Optional<PasswordResetToken> findByUser(User user);
    void deleteByUser(User user);

}
