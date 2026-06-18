import { computed, inject, Injectable, Signal, signal } from '@angular/core';
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

  readonly tasks = computed<Task[] | null>(() => this._storeService.tasks());

  private readonly selectedTaskId = signal<string | null>(null);

  readonly activeTask = computed<Task | undefined>(() => {
    const taskId = this.selectedTaskId();
    if (!taskId) return;

    return this._storeService.getTaskById(taskId)();
  });

  readonly taskDataById = computed(() => this._storeService.taskDataById());

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

  historyPop(): void {
    this._historyService.historyStackPop();
  }

  async submitReview(data: Pick<ReviewModel, 'taskId' | 'proofUrls'>): Promise<string> {
    return this._reviewUseCase.addReview(data);
  }

  reviewDataList(): Signal<ReviewModel[] | null> {
    return this._reviewStore.taskReviews;
  }

  setTaskIdData(taskId: string): void {
    this._storeService.setTaskId(taskId);
  }
}
