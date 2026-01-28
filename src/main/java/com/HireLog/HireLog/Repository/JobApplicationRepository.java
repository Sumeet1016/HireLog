package com.HireLog.HireLog.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.HireLog.HireLog.Entity.ApplicationStatus;
import com.HireLog.HireLog.Entity.JobApplication;
import com.HireLog.HireLog.Entity.User;

public interface JobApplicationRepository extends JpaRepository<JobApplication,Long> {
    Page<JobApplication> findByUser(User user, Pageable pageable);

    Page<JobApplication> findByUserAndStatus(
            User user,
            ApplicationStatus status,
            Pageable pageable);
}
