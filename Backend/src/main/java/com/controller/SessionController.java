package com.controller;

import com.bean.LoginRequest;
import com.entity.AdminEntity;
import com.repository.AdminRepository;
import com.service.AdminService;
import com.service.JWTService;
import com.service.OtpService;
import com.service.TokenBlackListService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/session")
public class SessionController {

    @Autowired
    AdminRepository adminRepo;

    @Autowired
    BCryptPasswordEncoder encoder;

    @Autowired
    AdminService adminService;

    @Autowired
    JWTService jwtService;

    @Autowired
    OtpService otpService;

    @Autowired
    JavaMailSender sender;

    @Autowired
    private TokenBlackListService tokenBlackListService;

    @PostMapping("/signup")
    public ResponseEntity<?> Signup(@RequestBody AdminEntity entity) {
        if (entity.getEmail() == null && entity.getPassword() == null) {
            return ResponseEntity.ok("Please enter your email or password");
        }
        entity.setPassword(encoder.encode(entity.getPassword()));
        adminRepo.save(entity);
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody LoginRequest login) {
        AdminEntity admin = adminService.authenticateAdmin(login.getEmail());
        if (admin != null) {
            if (encoder.matches(login.getPassword(), admin.getPassword())) {
                String token = jwtService.generateToken(login.getEmail());
                HashMap<String, Object> response = new HashMap<>();
                response.put("message", "Successfully Login");
                response.put("token", token);

                return ResponseEntity.ok()
                        .header("Authorization", "Bearer " + token)
                        .body(response);
            } else {
                return ResponseEntity.ok("Wrong password");
            }
        }
        return ResponseEntity.ok("Wrong email");
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7); // Remove "Bearer " prefix
            tokenBlackListService.blacklistToken(token);
            return ResponseEntity.ok("Logout successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No token found in request");
        }
    }

    @PostMapping("/sendotp")
    public ResponseEntity<String> sendOtp(@RequestBody LoginRequest loginRequest, HttpSession session) {
        String email = loginRequest.getEmail();
        Object admin = adminService.authenticateAdmin(email);
        if (admin == null) {
            return ResponseEntity.badRequest().body("Email not found");
        }
        String otp = otpService.getOtp();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("OTP");
        message.setText(otp);
        sender.send(message);
        session.setAttribute("otp", otp);
        System.out.println(otp);
        return ResponseEntity.ok("OTP sent successfully");
    }

    @PostMapping("/forgotpassword")
    public ResponseEntity<String> forgotPassword(@RequestBody LoginRequest loginRequest, HttpSession session) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        String otp = loginRequest.getOtp();
        String storedOtp = (String) session.getAttribute("otp");

        if (storedOtp == null || !storedOtp.equals(otp)) {
            return ResponseEntity.badRequest().body("Invalid OTP. Please request a new one");
        }

        Object admin = adminService.authenticateAdmin(email);

        if (admin == null) {
            return ResponseEntity.badRequest().body("Email not found");
        }

        AdminEntity adminEntity = (AdminEntity) admin;
        adminEntity.setPassword(encoder.encode(password));
        adminRepo.save(adminEntity);

        return ResponseEntity.ok("Password updated successfully");
    }

}
