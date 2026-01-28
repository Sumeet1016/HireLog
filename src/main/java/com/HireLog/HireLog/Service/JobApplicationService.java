package com.HireLog.HireLog.Service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.HireLog.HireLog.Dto.job.JobApplicationRequestDto;
import com.HireLog.HireLog.Dto.job.JobApplicationResponseDto;
import com.HireLog.HireLog.Entity.ApplicationStatus;
import com.HireLog.HireLog.Entity.JobApplication;

public interface JobApplicationService {
    
    JobApplicationResponseDto createJob(
            JobApplicationRequestDto requestDto,
            String email);

    Page<JobApplicationResponseDto> getAllJobs(
            String email,
            int page,
            int size,
            String sortBy,
            String sortDir,
            ApplicationStatus status);

    JobApplicationResponseDto getJobById(Long jobId, String email);

    JobApplicationResponseDto updateJob(
            Long jobId,
            JobApplicationRequestDto requestDto,
            String email);

    JobApplicationResponseDto updateJobStatus(
            Long jobId,
            String email,
            ApplicationStatus status);

    void deleteJob(Long jobId, String email);

}
