package com.aiagents.emailgen.model;

import lombok.Data;
import java.util.List;

@Data
public class EmailSequence {
    private String researchSummary;
    private List<Email> emails;

    @Data
    public static class Email {
        private String type; // FIRST_TOUCH, FOLLOW_UP, CHECK_IN
        private String subject;
        private String body;
        private int dayOffset;
    }
} 