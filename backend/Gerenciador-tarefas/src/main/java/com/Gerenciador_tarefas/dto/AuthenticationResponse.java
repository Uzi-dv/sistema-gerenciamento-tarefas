package com.Gerenciador_tarefas.dto;

import com.Gerenciador_tarefas.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private String jwt;
    private Long userId;
    private UserRole userRole;
}
