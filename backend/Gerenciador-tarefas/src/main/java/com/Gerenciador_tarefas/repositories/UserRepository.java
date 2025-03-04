package com.Gerenciador_tarefas.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.Gerenciador_tarefas.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findFristByEmail(String username);
    
}
