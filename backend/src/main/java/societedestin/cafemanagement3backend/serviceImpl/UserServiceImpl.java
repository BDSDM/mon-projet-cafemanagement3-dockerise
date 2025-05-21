package societedestin.cafemanagement3backend.serviceImpl;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.stereotype.Service;
import societedestin.cafemanagement3backend.dao.UserDao;
import societedestin.cafemanagement3backend.pojo.User;
import societedestin.cafemanagement3backend.service.UserService;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserDao userDao;

    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public User registerUser(User user) {
        return userDao.save(user);
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userDao.findById(id);
    }

    @Override
    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    @Override
    public User updateUser(Long id, User updatedUser) {
        return userDao.findById(id).map(user -> {
            // Vérifier si l'email existe déjà pour un autre utilisateur
            Optional<User> existingUserWithEmail = userDao.findByEmail(updatedUser.getEmail());

            if (existingUserWithEmail.isPresent() && !existingUserWithEmail.get().getId().equals(id)) {
                // Lancer une exception avec un code d'état HTTP 400 pour une erreur de validation
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "L'email " + updatedUser.getEmail() + " est déjà utilisé par un autre utilisateur.");
            }

            // Mise à jour des champs autorisés
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setRole(updatedUser.getRole());
            user.setStatus(updatedUser.getStatus());
            user.setContactNumber(updatedUser.getContactNumber());

            return userDao.save(user);
        }).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }


    @Override
    public void deleteUser(Long id) {
        userDao.deleteById(id);
    }
    @Override
    public Optional<User> getUserByEmail(String email) {
        return userDao.findByEmail(email);  // Assurez-vous que la méthode findByEmail est définie dans le repository
    }
    @Override
    @Transactional
    public boolean updateUserStatus(String email, String status) {
        Optional<User> userOptional = userDao.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setStatus(status);  // Mise à jour du statut
            userDao.save(user);  // Sauvegarde dans la base de données
            return true;
        }

        return false;  // L'utilisateur n'existe pas
    }
}
