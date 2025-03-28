package com.Gerenciador_tarefas.services.employee;

import java.util.List;
import com.Gerenciador_tarefas.dto.TaskDTO;

public interface EmployeeService {
    
    List<TaskDTO> getTasksByUserId();

    TaskDTO updateTask(Long id, String status);
}
