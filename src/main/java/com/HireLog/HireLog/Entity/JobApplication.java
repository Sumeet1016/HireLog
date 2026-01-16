package com.HireLog.HireLog.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class JobApplication {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;

    private String jobTitle;

    private String location;

      @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    private LocalDate appliedDate;

    @Column(length=1000)
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
