import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = { title: '', description: '', status: 'pending' };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => (this.tasks = data));
  }

  createTask(): void {
    if (!this.newTask.title) return;
    this.taskService.createTask(this.newTask).subscribe(() => {
      this.newTask = { title: '', description: '', status: 'pending' };
      this.loadTasks();
    });
  }

  updateStatus(task: Task): void {
    task.status = task.status === 'done' ? 'pending' : 'done';
    this.taskService.updateTask(task).subscribe(() => this.loadTasks());
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }
}
