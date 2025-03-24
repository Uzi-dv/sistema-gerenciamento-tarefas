package com.Gerenciador_tarefas.services.admin;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.Gerenciador_tarefas.dto.UserDto;
import com.Gerenciador_tarefas.entities.User;
import com.Gerenciador_tarefas.enums.UserRole;
import com.Gerenciador_tarefas.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final UserRepository userRepository;

    @Override
    public List<UserDto> getUsers() {
        return userRepository.findAll().stream()
        .filter(user -> user.getUserRole() == UserRole.EMPLOYEE)
        .map(User::getUserDto)
        .collect(Collectors.toList());
    }
    
}
