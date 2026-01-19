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
        Long userId
    );

    Page<JobApplicationResponseDto> getAllJobs(
        Long userId,
        int page,
        int size,
        String sortBy,
        String sortDir
    );

    JobApplicationResponseDto getJobById(Long jobId,Long userId);

    JobApplicationResponseDto updateJob(
        Long jobId,
        JobApplicationRequestDto requestDto,
        Long userId
    );

    JobApplicationResponseDto updateJobStatus(
        Long userId,
        Long jobId,
        ApplicationStatus status
    );

    Page<JobApplication> getJobs(Long userId,ApplicationStatus status,Pageable pageable);

    void deleteJob(Long jobId,Long userId);

}
