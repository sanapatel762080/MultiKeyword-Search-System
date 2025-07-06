package com.securesystem.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.securesystem.dto.RegisterRequest;
import com.securesystem.model.Role;
import com.securesystem.model.User;
import com.securesystem.repository.UserRepository;
import com.securesystem.service.OtpService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private OtpService otpService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

//    @PostMapping("/register")
//    public String register(@RequestBody RegisterRequest req) {
//        if (userRepo.findByEmail(req.email) != null) {
//            return "User already exists";
//        }
//
//        User user = new User();
//        user.setName(req.name);
//        user.setEmail(req.email);
//        user.setPassword(passwordEncoder.encode(req.password));
//        user.setRole(Role.USER);
//
//        userRepo.save(user);
//        return "Registration successful";
//    }
    
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest req) {
        if (userRepo.findByEmail(req.email) != null) {
            return "User already exists";
        }

        User user = new User();
        user.setName(req.name);
        user.setEmail(req.email);
        user.setPassword(req.password);  // ❗ Plaintext password
        user.setRole(Role.USER);

        userRepo.save(user);
        return "Registration successful";
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        // Step 1: Find user by email
        User user = userRepo.findByEmail(loginRequest.getEmail());

        // Step 2: Check if user exists
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("❌ Email not found");
        }

        // Step 3: Compare plain text password
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("❌ Invalid password");
        }

        // Step 4: Return role and email
        Map<String, String> response = new HashMap<>();
        response.put("email", user.getEmail());
        response.put("role", user.getRole().name());

        return ResponseEntity.ok(response);
    }


    @GetMapping("/forgot-password/request-otp")
    public ResponseEntity<String> requestOtp(@RequestParam String email) {
        User user = userRepo.findByEmail(email);
        if (user == null) return ResponseEntity.status(404).body("Email not found");

        String otp = otpService.generateOtp(email);
        return ResponseEntity.ok("Your OTP is: " + otp); // 🔥 In real apps, send via email
    }
    
    @PutMapping("/forgot-password/reset")
    public ResponseEntity<String> resetForgottenPassword(
        @RequestParam String email,
        @RequestParam String otp,
        @RequestParam String newPassword) {

        if (!otpService.validateOtp(email, otp)) {
            return ResponseEntity.status(403).body("Invalid or expired OTP");
        }

        User user = userRepo.findByEmail(email);
        if (user == null) return ResponseEntity.status(404).body("User not found");

        user.setPassword(newPassword); // hash if needed
        userRepo.save(user);
        otpService.clearOtp(email);
        return ResponseEntity.ok("Password reset successful!");
    }





}

