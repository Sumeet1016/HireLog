package com.HireLog.HireLog.controller;

import com.HireLog.HireLog.Dto.job.JobApplicationRequestDto;
import com.HireLog.HireLog.Dto.job.JobApplicationResponseDto;
import com.HireLog.HireLog.Dto.job.jobStatusUpdateRequetDto;
import com.HireLog.HireLog.Entity.ApplicationStatus;
import com.HireLog.HireLog.Service.JobApplicationService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    // CREATE JOB
    @PostMapping
    public ResponseEntity<JobApplicationResponseDto> createJob(
            @Valid @RequestBody JobApplicationRequestDto requestDto,
            @AuthenticationPrincipal String email) {

        JobApplicationResponseDto response = jobApplicationService.createJob(requestDto, email);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // GET ALL JOBS
    @GetMapping
    public ResponseEntity<Page<JobApplicationResponseDto>> getAllJobs(
            @AuthenticationPrincipal String email,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String status) {

        ApplicationStatus statusEnum = null;

        if (status != null && !status.isEmpty()) {
            statusEnum = ApplicationStatus.valueOf(status.toUpperCase());
        }

        Page<JobApplicationResponseDto> jobs = jobApplicationService.getAllJobs(
                email, page, size, sortBy, sortDir, statusEnum);

        return ResponseEntity.ok(jobs);
    }

    // GET JOB BY ID
    @GetMapping("/{jobId}")
    public ResponseEntity<JobApplicationResponseDto> getJobById(
            @PathVariable Long jobId,
            @AuthenticationPrincipal String email) {

        return ResponseEntity.ok(
                jobApplicationService.getJobById(jobId, email));
    }

    // UPDATE JOB
    @PutMapping("/{jobId}")
    public ResponseEntity<JobApplicationResponseDto> updateJob(
            @PathVariable Long jobId,
            @Valid @RequestBody JobApplicationRequestDto requestDto,
            @AuthenticationPrincipal String email) {

        return ResponseEntity.ok(
                jobApplicationService.updateJob(jobId, requestDto, email));
    }

    // UPDATE STATUS
    @PutMapping("/{jobId}/status")
    public ResponseEntity<JobApplicationResponseDto> updateJobStatus(
            @PathVariable Long jobId,
            @Valid @RequestBody jobStatusUpdateRequetDto requestDto,
            @AuthenticationPrincipal String email) {

        return ResponseEntity.ok(
                jobApplicationService.updateJobStatus(
                        jobId, email, requestDto.getStatus()));
    }

    // DELETE JOB
    @DeleteMapping("/{jobId}")
    public ResponseEntity<Void> deleteJob(
            @PathVariable Long jobId,
            @AuthenticationPrincipal String email) {

        jobApplicationService.deleteJob(jobId, email);
        return ResponseEntity.noContent().build();
    }
}
