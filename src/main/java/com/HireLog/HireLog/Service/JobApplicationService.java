package com.HireLog.HireLog.Service;


import org.springframework.data.domain.Page;
import com.HireLog.HireLog.Dto.job.JobApplicationRequestDto;
import com.HireLog.HireLog.Dto.job.JobApplicationResponseDto;
import com.HireLog.HireLog.Entity.ApplicationStatus;

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

    void deleteJob(Long jobId,Long userId);

}
