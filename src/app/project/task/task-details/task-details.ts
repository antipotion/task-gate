import { Component } from '@angular/core';
import { TaskHeader } from "../task-header/task-header";
import { TaskOverview } from "../task-overview/task-overview";
import { TaskStatus } from "../task-status/task-status";
import { TaskDependency } from "../task-dependency/task-dependency";
import { TaskSubtask } from "../task-subtask/task-subtask";
import { TaskTime } from "../task-time/task-time";
import { TaskComment } from "../task-comment/task-comment";
import { TaskHistory } from "../task-history/task-history";

@Component({
  selector: 'app-task-details',
  imports: [TaskHeader, TaskOverview, TaskStatus, TaskDependency, TaskSubtask, TaskTime, TaskComment, TaskHistory],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
})
export class TaskDetails {}
