import { computed, inject, Injectable } from '@angular/core';
import { UserModel } from '../../../../authentication/auth-model/auth.model';
import { AuthStore } from '../../../../authentication/auth-store/auth-store';
import { NavigationService } from '../../../../navigation/navigation-service';
import { TaskFacade } from '../../task-facade';
import { TaskActionModel } from '../../task.model';
import { ReviewStore } from '../review-store/review-store';
import { ReviewUsecase } from '../review-usecase/review-usecase';
import { NotificationUsecase } from '../../../../notification/notification-usecase/notification-usecase';
import { NotificationDTOModel } from '../../../../notification/notification.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewFacade {
  private readonly _reviewStore = inject(ReviewStore);
  private readonly _authStore = inject(AuthStore);
  private readonly _taskFacade = inject(TaskFacade);
  private readonly _reviewUsecase = inject(ReviewUsecase);
  private readonly _navigationService = inject(NavigationService);
  private readonly _notificationUsecase = inject(NotificationUsecase);

  readonly review = computed(() => this._reviewStore.review());
  readonly isMobileScreen = computed(() => this._navigationService.isMobileScreen());
  readonly userId = computed(() => this._authStore.userId());

  async getUserById(userId: string): Promise<UserModel | null> {
    return this._authStore.getUserById(userId);
  }

  selectTaskId(taskId: string): void {
    this._taskFacade.selectTaskId(taskId);
  }

  advanceTaskState(action: TaskActionModel): void {
    // Task ID is initialized when the page loads.
    // By the time review actions are available, activeTask is expected
    // to be resolved.
    const task = this._taskFacade.activeTask();
    if (!task) {
      throw new Error('No active task found');
    }

    this._taskFacade.advanceTaskState(task, action);
  }

  async closeReview(
    reviewId: string,
    action: Extract<TaskActionModel, 'APPROVE' | 'REJECT'>,
  ): Promise<void> {
    return this._reviewUsecase.closeReview(reviewId, action);
  }

  setReviewid(reviewId: string): void {
    this._reviewStore.setReviewId(reviewId);
  }

  async addNotification(data: Omit<NotificationDTOModel, 'createdAt'>): Promise<void> {
    return this._notificationUsecase.addNotification(data);
  }
}
