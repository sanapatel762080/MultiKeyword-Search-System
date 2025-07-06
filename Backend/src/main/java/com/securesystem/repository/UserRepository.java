package com.securesystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.securesystem.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

    User findByEmail(String email);

}
