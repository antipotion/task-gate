import { Component, computed, inject } from '@angular/core';
import { TaskFacade, type TaskState } from '../task-facade';
import type { Task } from '../task.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-task-completed',
  imports: [MatProgressSpinnerModule],
  templateUrl: './task-completed.html',
  styleUrl: './task-completed.scss',
})
export class TaskCompleted {
  private taskFacade = inject(TaskFacade);

  taskState = computed<TaskState>(() => this.taskFacade.taskState());
  completedTask = computed<Task[] | null>(() => {
    const state = this.taskState();
    if (state.status !== 'success') return null;

    return state.data.filter((task) => task.status === 'COMPLETED');
  });
}
