package com.HireLog.HireLog.Service.Impl;

import java.time.LocalDate;


import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.HireLog.HireLog.Dto.job.JobApplicationRequestDto;
import com.HireLog.HireLog.Dto.job.JobApplicationResponseDto;
import com.HireLog.HireLog.Entity.ApplicationStatus;
import com.HireLog.HireLog.Entity.JobApplication;
import com.HireLog.HireLog.Entity.User;
import com.HireLog.HireLog.Repository.JobApplicationRepository;
import com.HireLog.HireLog.Repository.UserRepository;
import com.HireLog.HireLog.Service.JobApplicationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobApplicationServiceImpl implements JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;

    @Override
    public JobApplicationResponseDto createJob(
            JobApplicationRequestDto requestDto,
            Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        JobApplication job = new JobApplication();
        job.setCompanyName(requestDto.getCompanyName());
        job.setJobTitle(requestDto.getJobTitle());
        job.setLocation(requestDto.getLocation());
        job.setNotes(requestDto.getNotes());
        job.setAppliedDate(LocalDate.now());
        job.setStatus(ApplicationStatus.APPLIED);
        job.setUser(user);

        JobApplication savedJob = jobApplicationRepository.save(job);

        return mapToResponseDto(savedJob);
    }

  

    @Override
    public Page<JobApplicationResponseDto> getAllJobs(
            Long userId,
            int page,
            int size,
            String sortBy,
            String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        PageRequest pageable = PageRequest.of(page, size, sort);

        Page<JobApplication> jobsPage = jobApplicationRepository.findByUserId(userId, pageable);

        return jobsPage.map(this::mapToResponseDto);
    }


    @Override
    public JobApplicationResponseDto getJobById(Long jobId, Long userId) {

        JobApplication job = jobApplicationRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access");
        }

        return mapToResponseDto(job);
    }

    @Override
    public Page<JobApplication> getJobs(
        Long userId,
        ApplicationStatus status,
        Pageable pageable
    ){
        if(status==null){
            return jobApplicationRepository.findByUserId(userId, pageable);
        }

        return jobApplicationRepository.findByUserIdAndStatus(userId, status, pageable);
    }

    @Override
    public JobApplicationResponseDto updateJob(
            Long jobId,
            JobApplicationRequestDto requestDto,
            Long userId) {

        JobApplication job = jobApplicationRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access");
        }

        job.setCompanyName(requestDto.getCompanyName());
        job.setJobTitle(requestDto.getJobTitle());
        job.setLocation(requestDto.getLocation());

        if(requestDto.getNotes()!=null){
        job.setNotes(requestDto.getNotes());
        }

        JobApplication updatedJob = jobApplicationRepository.save(job);

        return mapToResponseDto(updatedJob);
    }



    @Override
    public JobApplicationResponseDto updateJobStatus(
        Long userId,
        Long jobId,
        ApplicationStatus status
    ){
        JobApplication job=jobApplicationRepository.findById(jobId)
        .orElseThrow(()->
    new ResponseStatusException(HttpStatus.NOT_FOUND,"JobNot Found"));
    

    if(!job.getUser().getId().equals(userId)){
        throw new ResponseStatusException(HttpStatus.FORBIDDEN,"You Are note Allowed to update this job");
    }

    job.setStatus(status);

    JobApplication updatedJob=jobApplicationRepository.save(job);
    return mapToResponseDto(updatedJob);
    }
    @Override
public void deleteJob(Long jobId, Long userId) {

    JobApplication job = jobApplicationRepository.findById(jobId)
        .orElseThrow(() ->
            new ResponseStatusException(HttpStatus.NOT_FOUND, "Job not found")
        );

    if (!job.getUser().getId().equals(userId)) {
        throw new ResponseStatusException(
            HttpStatus.FORBIDDEN,
            "You are not allowed to delete this job"
        );
    }

    jobApplicationRepository.delete(job);
}


    // ✅ Correct mapping
    private JobApplicationResponseDto mapToResponseDto(JobApplication job) {

        JobApplicationResponseDto dto = new JobApplicationResponseDto();
        dto.setId(job.getId());
        dto.setCompanyName(job.getCompanyName());
        dto.setJobTitle(job.getJobTitle());
        dto.setLocation(job.getLocation());
        dto.setStatus(job.getStatus().name());
        dto.setAppliedDate(job.getAppliedDate());
        dto.setNotes(job.getNotes());
        
        return dto;
    }
}
