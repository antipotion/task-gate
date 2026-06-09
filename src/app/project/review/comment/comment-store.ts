import { inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { FirestoreProjectRepository } from '../../../infrastructure/firestore/firestore-project-repository';
import { CommentModel } from './comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentStore {
  private readonly _repo = inject(FirestoreProjectRepository);

  private readonly reviewId = signal<string | null>(null);
  readonly comments = toSignal<CommentModel[]>(
    toObservable(this.reviewId).pipe(
      filter((reviewId): reviewId is string => !!reviewId),
      switchMap((reviewId) => this._repo.listenToComments$(reviewId)),
    ),
    { initialValue: null },
  );

  setReviewId(reviewId: string): void {
    this.reviewId.set(reviewId);
  }
}
