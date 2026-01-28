package com.HireLog.HireLog.Controller;

import com.HireLog.HireLog.Dto.auth.JwtResponse;
import com.HireLog.HireLog.Dto.auth.LoginRequest;
import com.HireLog.HireLog.Dto.auth.RegisterRequest;
import com.HireLog.HireLog.Entity.User;
import com.HireLog.HireLog.Repository.UserRepository;
import com.HireLog.HireLog.security.JwtUtil;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(new JwtResponse(token));
    }
   @PostMapping("/register")
public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {

    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
        return ResponseEntity.badRequest().body("Email already registered");
    }

    User user = new User();
    user.setName(request.getName());
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));

    userRepository.save(user);

    return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
}

}
