import { Component, computed, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { TaskFacade, TaskState } from '../task-facade';
import type { Task, TaskStatus } from '../task.model';

@Component({
  selector: 'app-task-sort',
  imports: [MatProgressSpinnerModule, MatCardModule],
  templateUrl: './task-sort.html',
  styleUrl: './task-sort.scss',
})
export class TaskSort {
  private taskFacade = inject(TaskFacade);
  private router = inject(Router);

  readonly projectId = input.required<string>();
  readonly projectStatus = input.required<TaskStatus>();

  taskState = computed<TaskState>(() => this.taskFacade.taskState());
  todoTask = computed<Task[] | null>(() => {
    const state = this.taskState();
    if (state.status !== 'success') return null;

    return state.data.filter(
      (task) => task.projectId === this.projectId() && task.status === this.projectStatus(),
    );
  });

  onSelectTask(taskId: string): void {
    this.router.navigate(['task', `${taskId}`]);
  }
}
