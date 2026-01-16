package com.HireLog.HireLog.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    
    private String name;

    @Column(unique=true,nullable=false)
    private String email;
    
    private String password;
    
    private LocalDateTime createdAt;

    @PrePersist
    public void oncreate(){
        createdAt=LocalDateTime.now();
    }
}
