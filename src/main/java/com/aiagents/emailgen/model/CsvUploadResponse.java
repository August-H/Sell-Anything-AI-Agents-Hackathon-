package com.aiagents.emailgen.model;

import lombok.Data;
import java.util.List;

/**
 * Response model for CSV upload processing.
 * Contains the results of processing multiple prospects from a CSV file.
 */
@Data
public class CsvUploadResponse {
    /**
     * Total number of prospects processed
     */
    private int totalProcessed;
    
    /**
     * Number of successfully processed prospects
     */
    private int successful;
    
    /**
     * Number of failed prospects
     */
    private int failed;
    
    /**
     * List of generated email sequences for successful prospects
     */
    private List<EmailSequence> results;
    
    /**
     * List of error messages for failed prospects
     */
    private List<String> errors;
} 