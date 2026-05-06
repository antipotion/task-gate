import { Component, computed, inject } from '@angular/core';
import { TaskFacade, type TaskState } from '../task-facade';
import type { Task } from '../task.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-in-progress',
  imports: [MatProgressSpinnerModule, MatCardModule],
  templateUrl: './task-in-progress.html',
  styleUrl: './task-in-progress.scss',
})
export class TaskInProgress {
  private taskFacade = inject(TaskFacade);
  private router = inject(Router);

  taskState = computed<TaskState>(() => this.taskFacade.taskState());
  inProgressTask = computed<Task[] | null>(() => {
    const state = this.taskState();
    if (state.status !== 'success') return null;

    return state.data.filter((task) => task.status === 'IN-PROGRESS');
  });
  
  onSelectTask(taskId: string): void {
    this.router.navigate(['task', `${taskId}`]);
  }
}
