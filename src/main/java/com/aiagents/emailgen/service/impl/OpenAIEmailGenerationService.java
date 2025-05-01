package com.aiagents.emailgen.service.impl;

import com.aiagents.emailgen.model.EmailSequence;
import com.aiagents.emailgen.model.ProspectInfo;
import com.aiagents.emailgen.service.EmailGenerationService;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OpenAIEmailGenerationService implements EmailGenerationService {
    
    private final OpenAiService openAiService;
    
    @Override
    public Mono<EmailSequence> generateEmailSequence(ProspectInfo prospectInfo, String researchSummary) {
        return Mono.fromCallable(() -> {
            String prompt = buildPrompt(prospectInfo, researchSummary);
            
            ChatCompletionRequest request = ChatCompletionRequest.builder()
                .model("gpt-4")
                .messages(Arrays.asList(new ChatMessage("user", prompt)))
                .temperature(0.7)
                .build();

            String response = openAiService.createChatCompletion(request)
                .getChoices().get(0).getMessage().getContent();

            return parseResponse(response, researchSummary);
        });
    }

    private String buildPrompt(ProspectInfo prospect, String research) {
        return String.format("""
            Based on the following prospect information and research, generate a sequence of 3 sales emails:
            1. First touch email
            2. Follow-up email (3 days later)
            3. Check-in email (7 days after follow-up)
            
            Prospect Information:
            Name: %s
            Company: %s
            Role: %s
            Industry: %s
            Company Size: %s
            Additional Context: %s
            
            Research Summary:
            %s
            
            Make each email personalized, concise, and value-focused. Format the response as:
            [First Touch]
            Subject: <subject>
            Body: <body>
            
            [Follow Up]
            Subject: <subject>
            Body: <body>
            
            [Check In]
            Subject: <subject>
            Body: <body>
            """,
            prospect.getName(),
            prospect.getCompany(),
            prospect.getRole(),
            prospect.getIndustry(),
            prospect.getCompanySize(),
            prospect.getAdditionalContext(),
            research
        );
    }

    private EmailSequence parseResponse(String response, String researchSummary) {
        EmailSequence sequence = new EmailSequence();
        sequence.setResearchSummary(researchSummary);
        
        List<EmailSequence.Email> emails = Arrays.stream(response.split("\\["))
            .filter(part -> part.trim().length() > 0)
            .map(part -> {
                EmailSequence.Email email = new EmailSequence.Email();
                String[] lines = part.split("\\n");
                
                email.setType(lines[0].replace("]", "").trim());
                email.setSubject(lines[1].replace("Subject:", "").trim());
                
                StringBuilder body = new StringBuilder();
                for (int i = 2; i < lines.length; i++) {
                    if (lines[i].startsWith("Body:")) {
                        lines[i] = lines[i].replace("Body:", "");
                    }
                    body.append(lines[i].trim()).append("\n");
                }
                email.setBody(body.toString().trim());
                
                // Set day offset based on email type
                switch (email.getType()) {
                    case "First Touch":
                        email.setDayOffset(0);
                        break;
                    case "Follow Up":
                        email.setDayOffset(3);
                        break;
                    case "Check In":
                        email.setDayOffset(10);
                        break;
                }
                
                return email;
            })
            .toList();
        
        sequence.setEmails(emails);
        return sequence;
    }
} 