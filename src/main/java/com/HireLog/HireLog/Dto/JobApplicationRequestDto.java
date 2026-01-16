package com.HireLog.HireLog.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobApplicationRequestDto {

    private String companyName;
    private String jobTitle;
    private String location;
    private String notes;
}
