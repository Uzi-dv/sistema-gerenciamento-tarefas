package com.Gerenciador_tarefas.services.employee;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.Gerenciador_tarefas.dto.TaskDTO;
import com.Gerenciador_tarefas.entities.Task;
import com.Gerenciador_tarefas.entities.User;
import com.Gerenciador_tarefas.enums.TaskStatus;
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

    @Override
    public TaskDTO updateTask(Long id, String status) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if(optionalTask.isPresent()) {
            Task existingTask = optionalTask.get();
            existingTask.setTaskStatus(mapStringToTaskStatus(status));
            return taskRepository.save(existingTask).getTaskDTO();
        }
        throw new EntityNotFoundException("Tarefa não encontrado");
    }

    private TaskStatus mapStringToTaskStatus(String status) {
        return switch (status) {
            case "PENDENTE" -> TaskStatus.PENDING;
            case "EM PROGRESSO" -> TaskStatus.INPROGRESS;
            case "COMPLETA" -> TaskStatus.COMPLETED;
            case "ADIADA" -> TaskStatus.DEFERRED;
            default -> TaskStatus.CANCELED;
        };
    }
}
