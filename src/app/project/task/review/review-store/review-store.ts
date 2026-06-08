import { computed, effect, inject, Injectable, Signal, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { FirestoreProjectRepository } from '../../../../infrastructure/firestore/firestore-project-repository';
import { ReviewModel } from '../review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewStore {
  private readonly _repo = inject(FirestoreProjectRepository);

  readonly taskId = signal<string | null>(null);

  readonly taskReviews: Signal<ReviewModel[] | null> = toSignal(
    toObservable(this.taskId).pipe(
      filter((taskId): taskId is string => !!taskId),
      switchMap((taskId) => this._repo.listenToReviews$(taskId)),
    ),
    { initialValue: null },
  );

  setTaskId(taskId: string): void {
    this.taskId.set(taskId);
  }

  getCurrentReview(reviewId: string, taskId: string): Signal<ReviewModel | null> {
    this.setTaskId(taskId);

    return computed(() => {
      return this.taskReviews()?.find((review) => review.id === reviewId) ?? null;
    });
  }
}
