import { computed, inject, Injectable } from '@angular/core';
import { UserModel } from '../../../../authentication/auth-model/auth.model';
import { AuthStore } from '../../../../authentication/auth-store/auth-store';
import { ReviewStore } from '../review-store/review-store';
import { CommentStore } from './comment-store';
import { CommentUsecase } from './comment-usecase';

@Injectable({
  providedIn: 'root',
})
export class CommentFacade {
  private readonly _commentStore = inject(CommentStore);
  private readonly _commentUsecase = inject(CommentUsecase);
  private readonly _authStore = inject(AuthStore);
  private readonly _reviewSTore = inject(ReviewStore);

  readonly comments = computed(() => this._commentStore.comments());
  readonly reviewData = computed(() => this._reviewSTore.review());
  readonly userId = computed(() => this._authStore.userId());

  setReviewId(reviewId: string): void {
    this._commentStore.setReviewId(reviewId);
    this._reviewSTore.setReviewId(reviewId);
  }

  async addComment(reviewId: string, taskId: string, content: string): Promise<string> {
    return this._commentUsecase.addComment(reviewId, taskId, content);
  }

  async getUserById(userId: string): Promise<UserModel | null> {
    return this._authStore.getUserById(userId);
  }
}
