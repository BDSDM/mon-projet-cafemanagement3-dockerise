package societedestin.cafemanagement3backend.rest;

import org.springframework.http.ResponseEntity;
import societedestin.cafemanagement3backend.dto.UserDTO;
import societedestin.cafemanagement3backend.pojo.AuthResponse;

public interface AuthRest {
    // Modifier la signature pour renvoyer un ResponseEntity avec un AuthResponse
    ResponseEntity<AuthResponse> login(UserDTO userDTO);
}
