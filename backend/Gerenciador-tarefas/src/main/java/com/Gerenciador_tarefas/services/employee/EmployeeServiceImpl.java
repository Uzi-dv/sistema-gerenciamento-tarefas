package com.Gerenciador_tarefas.services.employee;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.Gerenciador_tarefas.dto.TaskDTO;
import com.Gerenciador_tarefas.entities.Task;
import com.Gerenciador_tarefas.entities.User;
import com.Gerenciador_tarefas.repositories.TaskRepository;
import com.Gerenciador_tarefas.utils.JwtUtil;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final TaskRepository taskRepository;
    private final JwtUtil jwtUtil;

    @Override
    public List<TaskDTO> getTasksByUserId() {
        User user = jwtUtil.getLoggedInUser();
        if(user != null) {
            taskRepository.findAllByUserId(user.getId())
            .stream()
            .sorted(Comparator.comparing(Task::getDueDate)
            .reversed())
            .map(Task::getTaskDTO)
            .collect(Collectors.toList());
        }
        throw new EntityNotFoundException("Usuário não encontrado");
    }
}
