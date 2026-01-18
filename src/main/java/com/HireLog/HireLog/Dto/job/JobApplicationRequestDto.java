package com.HireLog.HireLog.Dto.job;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobApplicationRequestDto {

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Job title is required")
    private String jobTitle;

    @NotBlank(message = "Location is required")
    private String location;
    
    private String notes;
}
