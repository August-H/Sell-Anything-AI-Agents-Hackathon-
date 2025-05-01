package com.aiagents.emailgen.service;

import com.aiagents.emailgen.model.CsvUploadResponse;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

/**
 * Service interface for processing CSV files containing prospect information.
 * This service handles the parsing of CSV files and the generation of email sequences
 * for multiple prospects in a batch process.
 */
public interface CsvProcessingService {
    /**
     * Processes a CSV file containing multiple prospects and generates email sequences.
     * 
     * @param file The CSV file to process
     * @return A Mono containing the CsvUploadResponse with processing results
     */
    Mono<CsvUploadResponse> processCsvFile(MultipartFile file);
} 