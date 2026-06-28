import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { HistoryService } from '../../application/history/history-service';
import { StoreService } from '../../application/store/store-service';
import { UserModel } from '../../authentication/auth-model/auth.model';
import { NavigationService } from '../../navigation/navigation-service';
import { TeamFacade } from '../../team/team-facade/team-facade';
import { ReviewStore } from './review/review-store/review-store';
import { ReviewUsecase } from './review/review-usecase/review-usecase';
import { ReviewModel } from './review/review.model';
import { getAvailableActions, transitionTask } from './task-state-machine';
import { TaskUseCase } from './task-use-case';
import { Task, TaskActionModel } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskFacade {
  private readonly _storeService = inject(StoreService);
  private readonly _taskUseCase = inject(TaskUseCase);
  private readonly _historyService = inject(HistoryService);
  private readonly _reviewUseCase = inject(ReviewUsecase);
  private readonly _reviewStore = inject(ReviewStore);
  private readonly _navigationService = inject(NavigationService);
  private readonly _teamFacade = inject(TeamFacade);

  readonly tasks = computed<Task[] | null>(() => this._storeService.tasks());
  readonly isMobileScreen = computed<boolean>(() => this._navigationService.isMobileScreen());

  private readonly selectedTaskId = signal<string | null>(null);

  readonly activeTask = computed<Task | undefined>(() => {
    const taskId = this.selectedTaskId();
    if (!taskId) return;

    return this._storeService.getTaskById(taskId)();
  });

  readonly taskReviews = computed(() => this._reviewStore.taskReviews());

  readonly taskDataById = computed(() => this._storeService.taskDataById());

  selectTaskId(taskId: string): void {
    this.selectedTaskId.set(taskId);
  }

  async addTask(projectId: string, task: Omit<Task, 'id'>): Promise<string> {
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

  setTaskIdForReviews(taskId: string): void {
    this._reviewStore.setTaskId(taskId);
  }

  async getUsersById(userIds: Set<string>): Promise<UserModel[] | null> {
    return this._teamFacade.getUsersById(userIds);
  }
}
