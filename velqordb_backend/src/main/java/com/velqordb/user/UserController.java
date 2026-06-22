package com.velqordb.user;

import com.velqordb.dto.MessageResponse;
import com.velqordb.dto.user.LoginResponse;
import com.velqordb.service.JwtService;
import com.velqordb.service.TokenBlacklistService;
import com.velqordb.dto.user.LoginRequest;
import com.velqordb.dto.user.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/user")
@RequiredArgsConstructor
public class UserController {
    private final JwtService jwtService;
    private final UserService userService;
    private final TokenBlacklistService tokenBlacklistService;

    @PostMapping("/register")
    ResponseEntity<MessageResponse> register(@Valid @RequestBody RegisterRequest userData){
        userService.registerUser(userData);
        return ResponseEntity.status(HttpStatus.CREATED).body(new MessageResponse("User Registered successfully"));
    }

    @PostMapping("/login")
    ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest userData){
        User user = userService.loginUser(userData);
        String token = jwtService.generateToken(user.getUsername());
        LoginResponse res = new LoginResponse();
        res.setToken(token);
        res.setUsername(user.getUsername());
        res.setRole(user.getRole().name());
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/logout")
    ResponseEntity<MessageResponse> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            long expiration = jwtService.extractExpiration(token).getTime();
            tokenBlacklistService.blacklistToken(token, expiration);
        }
        return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Logged out successfully"));
    }

    @GetMapping("/test")
    public ResponseEntity<String> testSecureEndpoint() {
        return ResponseEntity.ok("JWT validation is working correctly!");
    }
}
