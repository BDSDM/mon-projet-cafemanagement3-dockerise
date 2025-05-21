package societedestin.cafemanagement3backend.service;



import societedestin.cafemanagement3backend.pojo.ToDoList;

import java.util.List;

public interface ToDoListService {
    List<ToDoList> getAllTasksForUser(Integer userId);
    ToDoList getTaskById(Long taskId);
    ToDoList createTask(ToDoList task, String userEmail);
    ToDoList updateTask(Long taskId, ToDoList updatedTask);
    void deleteTask(Long taskId);
}
