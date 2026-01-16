package com.HireLog.HireLog.Service;

import com.HireLog.HireLog.Entity.User;

public interface UserService {
    
    User registerUser(User user);

    User getUserById(Long id);

    User getUserByEmail(String email);
}
