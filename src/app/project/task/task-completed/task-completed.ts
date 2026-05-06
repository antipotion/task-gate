import { Component, computed, inject } from '@angular/core';
import { TaskFacade, type TaskState } from '../task-facade';
import type { Task } from '../task.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-completed',
  imports: [MatProgressSpinnerModule, MatCardModule],
  templateUrl: './task-completed.html',
  styleUrl: './task-completed.scss',
})
export class TaskCompleted {
  private taskFacade = inject(TaskFacade);
  private router = inject(Router);
  
  taskState = computed<TaskState>(() => this.taskFacade.taskState());
  completedTask = computed<Task[] | null>(() => {
    const state = this.taskState();
    if (state.status !== 'success') return null;

    return state.data.filter((task) => task.status === 'APPROVED');
  });
  
  onSelectTask(taskId: string): void {
    this.router.navigate(['task', `${taskId}`]);
  }
}
