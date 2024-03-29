package com.example.demo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    
    User findOneByEmailAndPassword(String email, String password);
    User findByEmail(String email);
}
