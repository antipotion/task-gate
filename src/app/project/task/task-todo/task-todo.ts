import { Component, computed, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskFacade, TaskState } from '../task-facade';
import type { Task } from '../task.model';

@Component({
  selector: 'app-task-todo',
  imports: [MatProgressSpinnerModule, MatCardModule],
  templateUrl: './task-todo.html',
  styleUrl: './task-todo.scss',
})
export class TaskTodo {
  private taskFacade = inject(TaskFacade);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly projectId = input.required<string>();

  taskState = computed<TaskState>(() => this.taskFacade.taskState());
  todoTask = computed<Task[] | null>(() => {
    const state = this.taskState();
    if (state.status !== 'success') return null;

    return state.data.filter(
      (task) => task.projectId === this.projectId() && task.status === 'TODO',
    );
  });

  onSelectTask(taskId: string): void {
    this.router.navigate(['task', `${taskId}`], { relativeTo: this.route });
  }
}
