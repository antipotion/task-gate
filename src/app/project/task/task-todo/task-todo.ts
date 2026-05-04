import { Component, computed, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskFacade, TaskState } from '../task-facade';
import type { Task } from '../task.model';

@Component({
  selector: 'app-task-todo',
  imports: [MatProgressSpinnerModule],
  templateUrl: './task-todo.html',
  styleUrl: './task-todo.scss',
})
export class TaskTodo {
  private taskFacade = inject(TaskFacade);

  taskState = computed<TaskState>(() => this.taskFacade.taskState());
  todoTask = computed<Task[] | null>(() => {
    const state = this.taskState();
    if (state.status !== 'success') return null;

    return state.data.filter((task) => task.status === 'TODO');
  });
}
