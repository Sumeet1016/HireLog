package com.HireLog.HireLog.Service.Impl;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.HireLog.HireLog.Entity.User;
import com.HireLog.HireLog.Repository.UserRepository;
import com.HireLog.HireLog.Service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User registerUser(User user){
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public User getUserById(Long id){
        return userRepository.findById(id)
        .orElseThrow(()->new RuntimeException("User Not Found"));
    }
    
    public User getUserByEmail(String email){
        return userRepository.findByEmail(email)
        .orElseThrow(()->new RuntimeException("User Not Found"));
    }
}
