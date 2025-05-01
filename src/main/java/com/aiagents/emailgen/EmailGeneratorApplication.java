package com.aiagents.emailgen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class for the Email Generator service.
 * This class serves as the entry point for the Spring Boot application.
 * It enables auto-configuration and component scanning for the application.
 */
@SpringBootApplication
public class EmailGeneratorApplication {
    /**
     * Main method that starts the Spring Boot application.
     * 
     * @param args Command line arguments passed to the application
     */
    public static void main(String[] args) {
        SpringApplication.run(EmailGeneratorApplication.class, args);
    }
} 