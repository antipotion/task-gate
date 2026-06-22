import { computed, inject, Injectable } from '@angular/core';
import { AuthStore } from '../../../../authentication/auth-store';
import { UserModel } from '../../../../authentication/auth.model';
import { TaskFacade } from '../../task-facade';
import { TaskActionModel } from '../../task.model';
import { ReviewStore } from '../review-store/review-store';
import { ReviewUsecase } from '../review-usecase/review-usecase';

@Injectable({
  providedIn: 'root',
})
export class ReviewFacade {
  private readonly _reviewStore = inject(ReviewStore);
  private readonly _authStore = inject(AuthStore);
  private readonly _taskFacade = inject(TaskFacade);
  private readonly _reviewUsecase = inject(ReviewUsecase);

  readonly review = computed(() => this._reviewStore.review());

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
}
