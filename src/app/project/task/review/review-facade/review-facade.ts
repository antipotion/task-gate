import { computed, inject, Injectable, Signal } from '@angular/core';
import { AuthStore } from '../../../../authentication/auth-store';
import { UserModel } from '../../../../authentication/auth.model';
import { ReviewStore } from '../review-store/review-store';
import { ReviewModel } from '../review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewFacade {
  private readonly _reviewStore = inject(ReviewStore);
  private readonly _authStore = inject(AuthStore);

  getCurrentReview(reviewId: string | null, taskId: string | null): Signal<ReviewModel | null> {
    if (!reviewId || !taskId) return computed(() => null);

    return this._reviewStore.getCurrentReview(reviewId, taskId);
  }

  async getUserById(userId: string): Promise<UserModel | null> {
    return this._authStore.getUserById(userId);
  }
}
