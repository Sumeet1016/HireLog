package com.HireLog.HireLog.Service;

import java.util.List;

import com.HireLog.HireLog.Dto.job.JobApplicationRequestDto;
import com.HireLog.HireLog.Dto.job.JobApplicationResponseDto;
import com.HireLog.HireLog.Entity.ApplicationStatus;

public interface JobApplicationService {
    
    JobApplicationResponseDto createJob(
        JobApplicationRequestDto requestDto,
        Long userId
    );

    List <JobApplicationResponseDto> getAllJobs(Long userId);

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
