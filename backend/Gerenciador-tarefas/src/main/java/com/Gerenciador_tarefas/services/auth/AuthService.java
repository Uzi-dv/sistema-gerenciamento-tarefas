package com.Gerenciador_tarefas.services.auth;

import com.Gerenciador_tarefas.dto.SignupRequest;
import com.Gerenciador_tarefas.dto.UserDto;

public interface AuthService {
    UserDto signupUser(SignupRequest signupRequest);

    boolean hasUserWithEmail(String email);
}
