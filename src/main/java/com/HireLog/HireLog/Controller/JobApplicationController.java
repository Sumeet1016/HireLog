package com.HireLog.HireLog.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.PatchExchange;

import com.HireLog.HireLog.Dto.JobApplicationRequestDto;
import com.HireLog.HireLog.Dto.JobApplicationResponseDto;
import com.HireLog.HireLog.Service.JobApplicationService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobApplicationController {
    
    private final JobApplicationService jobApplicationService;

  
    @PostMapping("/{userId}")
    public ResponseEntity<JobApplicationResponseDto> createJob(
        @PathVariable Long userId,
        @RequestBody JobApplicationRequestDto requestDto
    ){
        return new ResponseEntity<>(jobApplicationService.createJob(requestDto, userId),HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<JobApplicationResponseDto>> getAllJobs(@PathVariable Long userId){
        return ResponseEntity.ok(jobApplicationService.getAllJobs(userId));
    }

    @GetMapping("/{userId}/{jobId}")
    public  ResponseEntity<JobApplicationResponseDto> getJobById(
        @PathVariable Long userId,
        @PathVariable Long jobId
    ){
        return ResponseEntity.ok(jobApplicationService.getJobById(userId,jobId));
    }
     
    @PutMapping("/{userId}/{jobId}")
    public ResponseEntity <JobApplicationResponseDto> updateJob(
        @PathVariable Long userId,
        @PathVariable Long jobId,
        @RequestBody JobApplicationRequestDto requestDto
    ){
        return ResponseEntity.ok(jobApplicationService.updateJob(jobId, requestDto, userId));
    }

    @DeleteMapping("/users/{userId}/jobs/{jobId}")
    public ResponseEntity<Void> deleteJob(
            @PathVariable Long jobId,
            @PathVariable Long userId) {

        jobApplicationService.deleteJob(jobId, userId);
        return ResponseEntity.noContent().build(); // 204
    }
}
