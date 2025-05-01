package com.aiagents.emailgen.config;

import com.theokanning.openai.service.OpenAiService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class for OpenAI service integration.
 * This class creates and configures the OpenAiService bean that will be used
 * throughout the application for interacting with OpenAI's API.
 */
@Configuration
public class OpenAIConfig {
    
    /**
     * OpenAI API key injected from application properties.
     * The key is expected to be set in the environment variables or application.yml
     */
    @Value("${openai.api.key}")
    private String openaiApiKey;
    
    /**
     * Creates and configures the OpenAiService bean.
     * 
     * @return Configured OpenAiService instance
     */
    @Bean
    public OpenAiService openAiService() {
        return new OpenAiService(openaiApiKey);
    }
} 