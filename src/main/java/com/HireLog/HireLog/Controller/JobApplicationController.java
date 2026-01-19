package com.HireLog.HireLog.Controller;


import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.HireLog.HireLog.Dto.job.JobApplicationRequestDto;
import com.HireLog.HireLog.Dto.job.JobApplicationResponseDto;
import com.HireLog.HireLog.Dto.job.jobStatusUpdateRequetDto;
import com.HireLog.HireLog.Service.JobApplicationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/api/users/{userId}/jobs")
@RequiredArgsConstructor
public class JobApplicationController {
    
    private final JobApplicationService jobApplicationService;

  
    @PostMapping
    public ResponseEntity<JobApplicationResponseDto> createJob(
        @PathVariable Long userId,
        @Valid @RequestBody JobApplicationRequestDto requestDto
    ){
        JobApplicationResponseDto response=jobApplicationService.createJob(requestDto,userId);

        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<JobApplicationResponseDto>> getAllJobs(
        @PathVariable Long userId,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "createdAt") String sortBy,
        @RequestParam(defaultValue = "desc") String sortDir){
            Page<JobApplicationResponseDto> jobs=jobApplicationService.getAllJobs(userId, page, size, sortBy, sortDir);

            return ResponseEntity.ok(jobs);
        }

    @GetMapping("{jobId}")
    public  ResponseEntity<JobApplicationResponseDto> getJobById(
        @PathVariable Long userId,
        @PathVariable Long jobId
    ){
        return ResponseEntity.ok(jobApplicationService.getJobById(userId,jobId));
    }
     
    @PutMapping("/{jobId}")
    public ResponseEntity <JobApplicationResponseDto> updateJob(
        @PathVariable Long userId,
        @PathVariable Long jobId,
        @Valid @RequestBody JobApplicationRequestDto requestDto
    ){
        return ResponseEntity.ok(jobApplicationService.updateJob(jobId, requestDto, userId));
    }

    @PutMapping("/{jobId}/staus")
    public ResponseEntity<JobApplicationResponseDto> updateJobStatus(
        @PathVariable Long userId,
        @PathVariable Long jobId,
        @Valid @RequestBody jobStatusUpdateRequetDto requetDto
    ){
        JobApplicationResponseDto response=jobApplicationService.updateJobStatus(userId, jobId, requetDto.getStatus());
    
        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/{jobId}")
    public ResponseEntity<Void> deleteJob(
            @PathVariable Long jobId,
            @PathVariable Long userId) {

        jobApplicationService.deleteJob(jobId, userId);
        return ResponseEntity.noContent().build(); // 204
    }
}