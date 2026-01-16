package com.HireLog.HireLog.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.HireLog.HireLog.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
