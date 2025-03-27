package com.Gerenciador_tarefas.services.admin;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.Gerenciador_tarefas.dto.TaskDTO;
import com.Gerenciador_tarefas.dto.UserDto;
import com.Gerenciador_tarefas.entities.Task;
import com.Gerenciador_tarefas.entities.User;
import com.Gerenciador_tarefas.enums.TaskStatus;
import com.Gerenciador_tarefas.enums.UserRole;
import com.Gerenciador_tarefas.repositories.TaskRepository;
import com.Gerenciador_tarefas.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    @Override
    public List<UserDto> getUsers() {
        return userRepository.findAll().stream()
        .filter(user -> user.getUserRole() == UserRole.EMPLOYEE)
        .map(User::getUserDto)
        .collect(Collectors.toList());
    }

    @Override
    public TaskDTO createTask(TaskDTO taskDTO) {
        Optional<User> optionalUser = userRepository.findById(taskDTO.getEmployeeId());
        if(optionalUser.isPresent()) {
            Task task = new Task();
            task.setTitle(taskDTO.getTitle());
            task.setDescription(taskDTO.getDescription());
            task.setPriority(taskDTO.getPriority());
            task.setDueDate(taskDTO.getDueDate());
            task.setTaskStatus(TaskStatus.INPROGRESS);
            task.setUser(optionalUser.get());
            return taskRepository.save(task).getTaskDTO();
        }
        return null;
    }

    @Override
    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll()
        .stream()
        .sorted(Comparator.comparing(Task::getDueDate).reversed())
        .map(Task::getTaskDTO)
        .collect(Collectors.toList());
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public TaskDTO getTaskById(Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        return optionalTask.map(Task::getTaskDTO).orElse(null);
    }
    
    @Override
    public TaskDTO updateTask(Long id, TaskDTO taskDTO) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        Optional<User> optionalUser = userRepository.findById(taskDTO.getEmployeeId());
        if(optionalTask.isPresent() && optionalUser.isPresent()){
            Task existingTask = optionalTask.get();
            existingTask.setTitle(taskDTO.getTitle());
            existingTask.setDescription(taskDTO.getDescription());
            existingTask.setDueDate(taskDTO.getDueDate());
            existingTask.setPriority(taskDTO.getPriority());
            existingTask.setTaskStatus(mapStringToTaskStatus(String.valueOf(taskDTO.getTaskStatus())));
            existingTask.setUser(optionalUser.get());
            return taskRepository.save(existingTask).getTaskDTO();
        }
        return null;
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

    @Override
    public List<TaskDTO> searchTaskByTitle(String title) {
        return taskRepository.findAllByTitleContaining(title)
        .stream()
        .sorted(Comparator.comparing(Task::getDueDate).reversed())
        .map(Task::getTaskDTO)
        .collect(Collectors.toList());
    }
    
}
