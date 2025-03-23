package com.Gerenciador_tarefas.dto;

import com.Gerenciador_tarefas.enums.UserRole;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String password;
    private UserRole userRole;
}
