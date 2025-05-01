package com.aiagents.emailgen.service;

import com.aiagents.emailgen.model.EmailSequence;
import com.aiagents.emailgen.model.ProspectInfo;
import reactor.core.publisher.Mono;

public interface EmailGenerationService {
    Mono<EmailSequence> generateEmailSequence(ProspectInfo prospectInfo, String researchSummary);
} 