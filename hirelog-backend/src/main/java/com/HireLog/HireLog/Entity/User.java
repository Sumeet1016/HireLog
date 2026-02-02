package com.HireLog.HireLog.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
    
    @NotBlank(message = "Name Cannot be Empty")
    private String name;

    @Email(message="Invalid Email Format")
    @NotBlank(message = "Email Cannot be Empty")
    @Column(unique=true,nullable=false)
    private String email;
    
    @NotBlank(message = "Password Cannot be Empty")
    @Size(min=6 , message = "Password has to be minimum of 6 characters")
    private String password;
    
    private LocalDateTime createdAt;

    @PrePersist
    public void oncreate(){
        createdAt=LocalDateTime.now();
    }
}
