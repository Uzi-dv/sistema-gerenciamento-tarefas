package com.Gerenciador_tarefas.dto;

import java.util.Date;
import com.Gerenciador_tarefas.enums.TaskStatus;
import lombok.Data;

@Data
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private Date dueDate;
    private String priority;
    private TaskStatus taskStatus;
    private Long employeeId; 
    private String employeeName;
}
