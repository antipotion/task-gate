import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, of, switchMap } from 'rxjs';
import { AuthStore } from '../../../../authentication/auth-store/auth-store';
import { FirestoreProjectRepository } from '../../../../infrastructure/firestore/firestore-project-repository';
import { ReviewModel } from '../review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewStore {
  private readonly _repo = inject(FirestoreProjectRepository);
  private readonly _authStore = inject(AuthStore);

  private readonly _userId = computed(() => this._authStore.userId());

  readonly _taskId = signal<string | null>(null);
  readonly _reviewId = signal<string | null>(null);

  readonly taskReviews: Signal<ReviewModel[] | null> = toSignal(
    combineLatest([toObservable(this._taskId), toObservable(this._userId)]).pipe(
      switchMap(([taskId, userId]) => {
        if (!taskId) {
          return of(null);
        }

        if (!userId) {
          return of(null);
        }

        return this._repo.listenToReviews$(taskId);
      }),
    ),
    { initialValue: null },
  );

  readonly review = toSignal<ReviewModel | null>(
    combineLatest([toObservable(this._reviewId), toObservable(this._userId)]).pipe(
      switchMap(([reviewId, userId]) => {
        if (!reviewId) {
          return of(null);
        }

        if (!userId) {
          return of(null);
        }

        return this._repo.listenToReviewById$(reviewId);
      }),
    ),
  );

  setTaskId(taskId: string): void {
    this._taskId.set(taskId);
  }

  setReviewId(reviewId: string): void {
    this._reviewId.set(reviewId);
  }
}
