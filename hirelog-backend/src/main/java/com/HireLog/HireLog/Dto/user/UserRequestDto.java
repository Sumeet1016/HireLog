package com.HireLog.HireLog.Dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDto{
    @NotBlank(message = "Name cannot be empty")
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Emaail cannot be empty")
    private String email;

    @NotBlank(message="Password cannont be empty")
    @Size(min=6,message = "Password must be atleast of 6 characters")
    private String password;
    
}