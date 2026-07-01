import { inject, Injectable, Signal, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, of, switchMap } from 'rxjs';
import { FirestoreProjectRepository } from '../../../../infrastructure/firestore/firestore-project-repository';
import { ReviewModel } from '../review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewStore {
  private readonly _repo = inject(FirestoreProjectRepository);

  readonly _taskId = signal<string | null>(null);
  readonly _reviewId = signal<string | null>(null);

  readonly taskReviews: Signal<ReviewModel[] | null> = toSignal(
    toObservable(this._taskId).pipe(
      switchMap((taskId) => {
        if (!taskId) {
          return of(null);
        }

        return this._repo.listenToReviews$(taskId);
      }),
    ),
    { initialValue: null },
  );

  readonly review = toSignal<ReviewModel | null>(
    toObservable(this._reviewId).pipe(
      filter((reviewId): reviewId is string => !!reviewId),
      switchMap((reviewId) => this._repo.listenToReviewById$(reviewId)),
    ),
  );

  setTaskId(taskId: string): void {
    this._taskId.set(taskId);
  }

  setReviewId(reviewId: string): void {
    this._reviewId.set(reviewId);
  }
}
