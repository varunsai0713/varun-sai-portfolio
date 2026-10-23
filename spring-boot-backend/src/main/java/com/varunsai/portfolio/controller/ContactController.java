package com.varunsai.portfolio.controller;

import com.varunsai.portfolio.dto.ContactRequest;
import com.varunsai.portfolio.service.EmailService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);
    private final EmailService emailService;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> submitMessage(@Valid @RequestBody ContactRequest request) {
        try {
            emailService.sendContactInquiry(request);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Message accepted by the email server.",
                "timestamp", Instant.now().toString()
            ));
        } catch (MailAuthenticationException e) {
            logger.error("Email service authentication failed. Check the configured SMTP credentials.", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(Map.of(
                "success", false,
                "error", "Email authentication failed. Create a Gmail App Password, enter it when restarting the backend, and try again."
            ));
        } catch (MailException e) {
            logger.error("Email service failed to deliver a contact message.", e);
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "error", "Email delivery failed. Check the Spring Boot logs and mail configuration, then try again."
            ));
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "Spring Boot Portfolio Backend API"
        ));
    }
}
