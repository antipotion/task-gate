import { computed, inject, Injectable } from '@angular/core';
import { CommentStore } from './comment-store';
import { CommentUsecase } from './comment-usecase';
import { AuthStore } from '../../../authentication/auth-store';
import { UserModel } from '../../../authentication/auth.model';

@Injectable({
  providedIn: 'root',
})
export class CommentFacade {
  private readonly _commentStore = inject(CommentStore);
  private readonly _commentUsecase = inject(CommentUsecase);
  private readonly _authStore = inject(AuthStore);

  readonly comments = computed(() => this._commentStore.comments());

  setReviewId(reviewId: string): void {
    this._commentStore.setReviewId(reviewId);
  }

  async addComment(reviewId: string, taskId: string, content: string): Promise<string> {
    return this._commentUsecase.addComment(reviewId, taskId, content);
  }

  async getUserById(userId: string): Promise<UserModel | null> {
    return this._authStore.getUserById(userId);
  }
}
