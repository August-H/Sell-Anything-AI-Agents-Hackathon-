package com.aiagents.emailgen.controller;

import com.aiagents.emailgen.model.CsvUploadResponse;
import com.aiagents.emailgen.model.EmailSequence;
import com.aiagents.emailgen.model.ProspectInfo;
import com.aiagents.emailgen.service.CsvProcessingService;
import com.aiagents.emailgen.service.EmailGenerationService;
import com.aiagents.emailgen.service.ResearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * REST controller for handling email generation requests.
 * Provides endpoints for both single prospect processing and batch processing via CSV upload.
 */
@RestController
@RequestMapping("/api/v1/emails")
@RequiredArgsConstructor
public class EmailGeneratorController {

    private final ResearchService researchService;
    private final EmailGenerationService emailGenerationService;
    private final CsvProcessingService csvProcessingService;

    /**
     * Generates email sequences for a single prospect.
     * 
     * @param prospectInfo The prospect information
     * @return Mono containing the generated email sequence
     */
    @PostMapping(value = "/generate", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<EmailSequence> generateEmails(@RequestBody ProspectInfo prospectInfo) {
        return researchService.conductResearch(prospectInfo)
            .flatMap(research -> emailGenerationService.generateEmailSequence(prospectInfo, research));
    }

    /**
     * Generates email sequences for a single prospect with streaming updates.
     * 
     * @param prospectInfo The prospect information
     * @return Flux containing status updates and the final email sequence
     */
    @PostMapping(value = "/generate-stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Object> generateEmailsStream(@RequestBody ProspectInfo prospectInfo) {
        return Flux.concat(
            Mono.just(new Status("Starting prospect research...")),
            researchService.conductResearch(prospectInfo)
                .map(research -> new Status("Research completed. Generating emails..."))
                .flatMap(status -> Mono.just(status)),
            researchService.conductResearch(prospectInfo)
                .flatMap(research -> emailGenerationService.generateEmailSequence(prospectInfo, research))
        );
    }

    /**
     * Processes a CSV file containing multiple prospects and generates email sequences.
     * 
     * @param file The CSV file to process
     * @return Mono containing the processing results
     */
    @PostMapping(value = "/upload-csv", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Mono<CsvUploadResponse> uploadCsv(@RequestParam("file") MultipartFile file) {
        return csvProcessingService.processCsvFile(file);
    }

    /**
     * Record class for status messages in the streaming response.
     */
    private record Status(String message) {}
} 