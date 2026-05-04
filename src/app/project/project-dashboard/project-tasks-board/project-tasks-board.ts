import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TaskTodo } from "../../task/task-todo/task-todo";
import { TaskInProgress } from "../../task/task-in-progress/task-in-progress";
import { TaskCompleted } from "../../task/task-completed/task-completed";

@Component({
  selector: 'app-project-tasks-board',
  imports: [MatIconModule, TaskTodo, TaskInProgress, TaskCompleted],
  templateUrl: './project-tasks-board.html',
  styleUrl: './project-tasks-board.scss',
})
export class ProjectTasksBoard {}
