package com.HireLog.HireLog.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.HireLog.HireLog.Dto.user.UserRequestDto;
import com.HireLog.HireLog.Dto.user.UserResponseDto;
import com.HireLog.HireLog.Entity.User;
import com.HireLog.HireLog.Service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final UserService userService;

    public UserController(UserService userService){
        this.userService=userService;
    }

    // @PostMapping("/register")
    // public ResponseEntity<User> registerUser(@RequestBody User user){
    //     return new ResponseEntity<>(
    //         userService.registerUser(user),
    //         HttpStatus.CREATED);
        
    // }

    @PostMapping
    public ResponseEntity<UserResponseDto> registerUser(
        @Valid @RequestBody UserRequestDto requestDto)
    {
        User user=new User();
        user.setName(requestDto.getName());
        user.setEmail(requestDto.getEmail());
        user.setPassword(requestDto.getPassword());

        User savedUser=userService.registerUser(user);

        UserResponseDto responseDto= mapToResponseDto(savedUser);
        return new ResponseEntity<>(responseDto,HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id){
        User user=userService.getUserById(id);
        return ResponseEntity.ok(mapToResponseDto(user));

    }

    //if we use 2 getmapping at same level it causes is issue
    @GetMapping("/by-email")
    public ResponseEntity<UserResponseDto> getUserByEmail(@RequestParam String email){
        User user=userService.getUserByEmail(email);

        return ResponseEntity.ok(mapToResponseDto(user));
    }

    private UserResponseDto mapToResponseDto(User user){
        UserResponseDto dto=new UserResponseDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setName(user.getName());
        return dto;
    }

}
