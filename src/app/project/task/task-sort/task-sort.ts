import { Component, computed, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ROUTES_PARAMS } from '../../../app.routes';
import { TaskFacade } from '../task-facade';
import type { Task, TaskStatus } from '../task.model';

@Component({
  selector: 'app-task-sort',
  imports: [MatProgressSpinnerModule, MatCardModule],
  templateUrl: './task-sort.html',
  styleUrl: './task-sort.scss',
})
export class TaskSort {
  private readonly _taskFacade = inject(TaskFacade);
  private readonly _router = inject(Router);

  readonly projectId = input.required<string>();
  readonly projectStatus = input.required<TaskStatus>();

  readonly tasks = computed<Task[] | null>(() => this._taskFacade.tasks());
  readonly todoTask = computed<Task[] | null>(() => {
    const tasks = this.tasks();
    if (!tasks) return null;

    return tasks.filter(
      (task) => task.projectId === this.projectId() && task.status === this.projectStatus(),
    );
  });

  onSelectTask(taskId: string): void {
    this._router.navigate([ROUTES_PARAMS.task, taskId]);
  }
}
