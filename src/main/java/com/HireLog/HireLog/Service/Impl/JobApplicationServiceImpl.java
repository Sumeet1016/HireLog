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
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        JobApplication job = new JobApplication();
        job.setCompanyName(requestDto.getCompanyName());
        job.setJobTitle(requestDto.getJobTitle());
        job.setLocation(requestDto.getLocation());
        job.setNotes(requestDto.getNotes());
        job.setAppliedDate(LocalDate.now());
        job.setStatus(ApplicationStatus.APPLIED);
        job.setUser(user);

        return mapToResponseDto(jobApplicationRepository.save(job));
    }

  

    @Override
    public Page<JobApplicationResponseDto> getAllJobs(
            String email,
            int page,
            int size,
            String sortBy,
            String sortDir,
            ApplicationStatus status) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<JobApplication> jobs = (status == null)
                ? jobApplicationRepository.findByUser(user, pageable)
                : jobApplicationRepository.findByUserAndStatus(user, status, pageable);

        return jobs.map(this::mapToResponseDto);
    }

    @Override
    public JobApplicationResponseDto getJobById(Long jobId, String email) {

        JobApplication job = jobApplicationRepository.findById(jobId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job not found"));

        if (!job.getUser().getEmail().equals(email)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized");
        }

        return mapToResponseDto(job);
    }


    @Override
    public JobApplicationResponseDto updateJob(
            Long jobId,
            JobApplicationRequestDto requestDto,
            String email) {

        JobApplication job = jobApplicationRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getUser().getId().equals(email)) {
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
            Long jobId,
            String email,
            ApplicationStatus status) {

        JobApplication job = jobApplicationRepository.findById(jobId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job not found"));

        if (!job.getUser().getEmail().equals(email)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized");
        }

        job.setStatus(status);
        return mapToResponseDto(jobApplicationRepository.save(job));
    }

    @Override
    public void deleteJob(Long jobId, String email) {

        JobApplication job = jobApplicationRepository.findById(jobId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job not found"));

        if (!job.getUser().getEmail().equals(email)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized");
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
