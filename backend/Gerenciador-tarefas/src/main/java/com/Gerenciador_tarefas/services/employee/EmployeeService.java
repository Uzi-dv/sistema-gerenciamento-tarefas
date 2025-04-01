package com.Gerenciador_tarefas.services.employee;

import java.util.List;
import com.Gerenciador_tarefas.dto.TaskDTO;
import com.Gerenciador_tarefas.dto.UserDto;

public interface EmployeeService {
    
    List<TaskDTO> getTasksByUserId();
    TaskDTO updateTaskStatus(Long id, String status);
    List<UserDto> getUsers();
    TaskDTO createTask(TaskDTO taskDTO);
    List<TaskDTO> getAllTasks();
    void deleteTask(Long id);
    TaskDTO getTaskById(Long id);
    TaskDTO updateTask(Long id, TaskDTO taskDTO);
    List<TaskDTO> searchTaskByTitle(String title);

}
