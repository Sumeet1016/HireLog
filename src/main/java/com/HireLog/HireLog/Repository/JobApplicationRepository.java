package com.HireLog.HireLog.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.HireLog.HireLog.Entity.ApplicationStatus;
import com.HireLog.HireLog.Entity.JobApplication;

public interface JobApplicationRepository extends JpaRepository<JobApplication,Long> {
    Page <JobApplication> findByUserId(Long userId,Pageable pageable);

    Page<JobApplication> findByUserIdAndStatus(Long userId,ApplicationStatus status,Pageable pageable);
}
