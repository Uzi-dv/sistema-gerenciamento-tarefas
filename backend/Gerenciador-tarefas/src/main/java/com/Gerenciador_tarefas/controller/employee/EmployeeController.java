package com.Gerenciador_tarefas.controller.employee;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.Gerenciador_tarefas.dto.TaskDTO;
import com.Gerenciador_tarefas.services.employee.EmployeeService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin("*")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;

    @GetMapping("/users")
    public ResponseEntity<?> getUsers() {
        return ResponseEntity.ok(employeeService.getUsers());
    }

    @PostMapping("/task")
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskDTO taskDTO) {
        TaskDTO createdTaskDTO = employeeService.createTask(taskDTO);
        if (createdTaskDTO == null)return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTaskDTO);
    }

    @GetMapping("/tasks/all")
    public ResponseEntity<?> getAllTasks() {
        return ResponseEntity.ok(employeeService.getUsers());
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        employeeService.deleteTask(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/task/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getTaskById(id));
    }

        @PutMapping("/task/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody TaskDTO taskDTO) {
        TaskDTO updateTask = employeeService.updateTask(id, taskDTO);
        if(updateTask == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updateTask); 
    }

    @GetMapping("/tasks/search/{title}")
    public ResponseEntity<List<TaskDTO>> searchTask(@PathVariable String title) {
        return ResponseEntity.ok(employeeService.searchTaskByTitle(title));
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<TaskDTO>> getTasksByUserId() {
        return ResponseEntity.ok(employeeService.getTasksByUserId());
    }

    @GetMapping("/task/{id}/{status}")
    public ResponseEntity<TaskDTO> updateTaskStatus(@PathVariable Long id, @PathVariable String status) {
        TaskDTO updateTaskDTO = employeeService.updateTaskStatus(id, status);
        if(updateTaskDTO == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.ok(updateTaskDTO);
    }
}
