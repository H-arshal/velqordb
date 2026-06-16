package com.velqordb.user;


import com.velqordb.dto.user.LoginRequest;
import com.velqordb.dto.user.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public User registerUser(RegisterRequest userData){
        if(userRepository.existsByUsername(userData.getUsername())|| userRepository.existsByEmail(userData.getEmail())){
            throw new IllegalArgumentException("Email or Username is already taken");
        }
        User user = new User();
        user.setEmail(userData.getEmail());
        user.setUsername(userData.getUsername());
        user.setPassword(passwordEncoder.encode(userData.getPassword()));
        user.setRole(Role.USER);
        userRepository.save(user);
        return user;
    }

    public User loginUser(LoginRequest userData){
        String username = userData.getUsername();
        String password = userData.getPassword();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User not registered, Please register first"));

        if (!passwordEncoder.matches(password,user.getPassword())) {
            throw new IllegalArgumentException("Password did not match, please try again");
        }
        return user;
    }
}
