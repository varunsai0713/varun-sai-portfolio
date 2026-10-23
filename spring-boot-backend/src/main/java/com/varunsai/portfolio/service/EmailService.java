package com.varunsai.portfolio.service;

import com.varunsai.portfolio.dto.ContactRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    @Value("${portfolio.mail.recipient:varunsaiv0713@gmail.com}")
    private String recipientEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactInquiry(ContactRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(senderEmail);
        message.setTo(recipientEmail);
        message.setReplyTo(request.getEmail());
        message.setSubject("New Portfolio Message from " + request.getName());
        message.setText(
            "You received a new inquiry from your portfolio website:\n\n" +
            "Sender Name:  " + request.getName() + "\n" +
            "Sender Email: " + request.getEmail() + "\n\n" +
            "Message:\n" +
            request.getMessage() + "\n\n" +
            "---\n" +
            "Dispatched via Varun Sai Portfolio Spring Boot Backend Service"
        );

        mailSender.send(message);
    }
}
