package com.HireLog.HireLog.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class JobApplication {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Companyname cannot is Required")
    private String companyName;

    @NotBlank(message = "Job Title is required")
    private String jobTitle;

    
    private String location;

    @NotNull(message="Application Status is required")
      @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    @NotNull(message = "Applied date is required")
    private LocalDate appliedDate;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @ManyToOne
    @JoinColumn(name="user_id",nullable = false)
    private User user;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void oncreate(){
        createdAt=LocalDateTime.now();
    }

    @PreUpdate
    public void onupdated(){
        updatedAt=LocalDateTime.now();
    }
}
