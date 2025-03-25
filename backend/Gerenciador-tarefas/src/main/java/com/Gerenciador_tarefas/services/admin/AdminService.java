package com.Gerenciador_tarefas.services.admin;

import java.util.List;
import com.Gerenciador_tarefas.dto.TaskDTO;
import com.Gerenciador_tarefas.dto.UserDto;

public interface AdminService {
    List<UserDto> getUsers();

    TaskDTO createTask(TaskDTO taskDTO);
}
