package societedestin.cafemanagement3backend.restImpl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import societedestin.cafemanagement3backend.dto.UserDTO;
import societedestin.cafemanagement3backend.jwt.JwtUtil;
import societedestin.cafemanagement3backend.pojo.AuthResponse;
import societedestin.cafemanagement3backend.pojo.User;
import societedestin.cafemanagement3backend.rest.AuthRest;
import societedestin.cafemanagement3backend.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthRestImpl implements AuthRest {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthRestImpl(UserService userService, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    @Override
    public ResponseEntity<AuthResponse> login(@RequestBody UserDTO userDTO) {
        // Vérification de l'utilisateur par email
        User user = userService.getUserByEmail(userDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Vérification du mot de passe avec BCrypt
        if (passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
            // Génération de l'access token
            String accessToken = jwtUtil.generateToken(user.getEmail(), user.getName(), user.getId(), user.getRole());

            // Génération du refresh token
            String refreshToken = jwtUtil.generateRefreshToken(user.getEmail(), user.getName(), user.getId(), user.getRole());

            // Retourner les deux tokens dans la réponse
            return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken));
        } else {
            throw new RuntimeException("Mot de passe incorrect");
        }
    }
}
