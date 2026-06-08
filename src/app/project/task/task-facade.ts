import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith } from 'rxjs';
import { HistoryService } from '../../application/history/history-service';
import { StoreService } from '../../application/store/store-service';
import { ReviewStore } from './review/review-store/review-store';
import { ReviewUsecase } from './review/review-usecase/review-usecase';
import { ReviewModel } from './review/review.model';
import { getAvailableActions, transitionTask } from './task-state-machine';
import { TaskUseCase } from './task-use-case';
import { Task, TaskActionModel } from './task.model';

export type TaskState =
  | { status: 'loading' }
  | { status: 'success'; data: Task[] }
  | { status: 'error'; error: string };

@Injectable({ providedIn: 'root' })
export class TaskFacade {
  private readonly _storeService = inject(StoreService);
  private readonly _taskUseCase = inject(TaskUseCase);
  private readonly _historyService = inject(HistoryService);
  private readonly _reviewUseCase = inject(ReviewUsecase);
  private readonly _reviewStore = inject(ReviewStore);

  readonly taskState = toSignal(
    this._storeService.tasks$.pipe(
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

  addTask(projectId: string, task: Omit<Task, 'id'>): Promise<string> {
    return this._taskUseCase.addTask(projectId, task);
  }

  updatetask(taskId: string, original: Task, dto: Partial<Task>): Promise<void> {
    return this._taskUseCase.updateTask(taskId, original, dto);
  }

  deleteTask(taskId: string): Promise<void> {
    return this._taskUseCase.deleteTask(taskId);
  }

  nextTaskState(task: Task): TaskActionModel | undefined {
    return getAvailableActions(task);
  }

  advanceTaskState(task: Task, action: TaskActionModel): void {
    const taskId = task.id;
    const advancedTask = transitionTask(task, action);

    this.updatetask(taskId, task, advancedTask);
  }

  goBack(): void {
    this._historyService.goBack();
  }

  historyPop(): void {
    this._historyService.historyStackPop();
  }

  async submitReview(data: Pick<ReviewModel, 'taskId' | 'proofUrls'>): Promise<string> {
    return this._reviewUseCase.addReview(data);
  }

  reviewDataList(): Signal<ReviewModel[] | null> {
    return this._reviewStore.taskReviews;
  }

  setTaskId(taskId: string): void {
    this._reviewStore.setTaskId(taskId);
  }
}
