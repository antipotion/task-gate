import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith } from 'rxjs';
import { StoreService } from '../../application/store/store-service';
import { TaskUseCase } from './task-use-case';
import { Task, TaskAction, TaskStatus } from './task.model';
import { findTransition, getAvailableActions, TransitionDefinition, transitionTask } from './task-state-machine';

export type TaskState =
  | { status: 'loading' }
  | { status: 'success'; data: Task[] }
  | { status: 'error'; error: string };

@Injectable()
export class TaskFacade {
  private storeService = inject(StoreService);
  private taskUseCase = inject(TaskUseCase);

  readonly taskState = toSignal(
    this.storeService.tasks$.pipe(
      map(
        (tasks): TaskState => ({
          status: 'success',
          data: tasks,
        }),
      ),
      startWith({ status: 'loading' } as TaskState),
      catchError((error) => of({ status: 'error', error: String(error) } as TaskState)),
    ),
    { initialValue: { status: 'loading' } },
  );

  private readonly selectedTaskId = signal<string | null>(null);

  readonly activeTask = computed<Task | null>(() => {
    const state = this.taskState();
    const id = this.selectedTaskId();

    if (state.status !== 'success' || !id) return null;

    return state.data.find((p) => p.id === id) ?? null;
  });

  selectTaskId(taskId: string): void {
    this.selectedTaskId.set(taskId);
  }

  addTask(taskId: string, task: Omit<Task, 'id'>): Promise<string> {
    return this.taskUseCase.addTask(taskId, task);
  }

  updatetask(taskId: string, original: Task, dto: Partial<Task>): Promise<void> {
    return this.taskUseCase.updateTask(taskId, original, dto);
  }

  deleteTask(taskId: string): Promise<void> {
    return this.taskUseCase.deleteTask(taskId);
  }

  nextTaskState(task: Task): TaskAction | undefined {
    return getAvailableActions(task);
  }

  advanceTaskState(task: Task, action: TaskAction): void {
    const taskId = task.id;
    const advancedTask = transitionTask(task, action);

    this.updatetask(taskId, task, advancedTask);
  }
}
