package societedestin.cafemanagement3backend.rest;

import org.springframework.http.ResponseEntity;
import societedestin.cafemanagement3backend.dto.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserRest {
    ResponseEntity<UserDTO> registerUser(UserDTO userDTO);
    Optional<UserDTO> getUserById(Long id);
    List<UserDTO> getAllUsers();
    UserDTO updateUser(Long id, UserDTO userDTO);
    void deleteUser(Long id);
}
