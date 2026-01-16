package com.HireLog.HireLog.Dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class JobApplicationResponseDto {
    private Long id;
    private String companyName;
    private String jobTitle;
    private String location;
    private String status;
    private LocalDate appliedDate;
}
