package com.aiagents.emailgen.service.impl;

import com.aiagents.emailgen.model.CsvUploadResponse;
import com.aiagents.emailgen.model.EmailSequence;
import com.aiagents.emailgen.model.ProspectInfo;
import com.aiagents.emailgen.service.CsvProcessingService;
import com.aiagents.emailgen.service.EmailGenerationService;
import com.aiagents.emailgen.service.ResearchService;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Implementation of the CsvProcessingService interface.
 * This service handles the processing of CSV files containing prospect information
 * and coordinates the generation of email sequences for each prospect.
 */
@Service
@RequiredArgsConstructor
public class CsvProcessingServiceImpl implements CsvProcessingService {

    private final ResearchService researchService;
    private final EmailGenerationService emailGenerationService;

    @Override
    public Mono<CsvUploadResponse> processCsvFile(MultipartFile file) {
        return Mono.fromCallable(() -> {
            List<EmailSequence> results = new ArrayList<>();
            List<String> errors = new ArrayList<>();
            AtomicInteger successful = new AtomicInteger(0);
            AtomicInteger failed = new AtomicInteger(0);

            try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
                // Skip header row
                reader.readNext();

                String[] line;
                while ((line = reader.readNext()) != null) {
                    try {
                        ProspectInfo prospect = createProspectFromCsv(line);
                        processProspect(prospect)
                            .subscribe(
                                sequence -> {
                                    results.add(sequence);
                                    successful.incrementAndGet();
                                },
                                error -> {
                                    errors.add("Failed to process prospect: " + error.getMessage());
                                    failed.incrementAndGet();
                                }
                            );
                    } catch (Exception e) {
                        errors.add("Invalid CSV row: " + String.join(",", line) + " - " + e.getMessage());
                        failed.incrementAndGet();
                    }
                }
            } catch (IOException | CsvValidationException e) {
                throw new RuntimeException("Error reading CSV file", e);
            }

            CsvUploadResponse response = new CsvUploadResponse();
            response.setTotalProcessed(successful.get() + failed.get());
            response.setSuccessful(successful.get());
            response.setFailed(failed.get());
            response.setResults(results);
            response.setErrors(errors);

            return response;
        });
    }

    /**
     * Creates a ProspectInfo object from a CSV row.
     * 
     * @param line The CSV row data
     * @return ProspectInfo object
     */
    private ProspectInfo createProspectFromCsv(String[] line) {
        if (line.length < 7) {
            throw new IllegalArgumentException("CSV row must contain at least 7 columns");
        }

        ProspectInfo prospect = new ProspectInfo();
        prospect.setName(line[0]);
        prospect.setCompany(line[1]);
        prospect.setRole(line[2]);
        prospect.setLinkedinUrl(line[3]);
        prospect.setIndustry(line[4]);
        prospect.setCompanySize(line[5]);
        prospect.setAdditionalContext(line[6]);

        return prospect;
    }

    /**
     * Processes a single prospect and generates their email sequence.
     * 
     * @param prospect The prospect information
     * @return Mono containing the generated email sequence
     */
    private Mono<EmailSequence> processProspect(ProspectInfo prospect) {
        return researchService.conductResearch(prospect)
            .flatMap(research -> emailGenerationService.generateEmailSequence(prospect, research));
    }
} 