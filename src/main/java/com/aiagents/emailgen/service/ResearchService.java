package com.aiagents.emailgen.service;

import com.aiagents.emailgen.model.ProspectInfo;
import reactor.core.publisher.Mono;

public interface ResearchService {
    Mono<String> conductResearch(ProspectInfo prospectInfo);
} 