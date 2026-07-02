import { inject, Injectable } from '@angular/core';
import { FirestoreProjectRepository } from '../../../infrastructure/firestore/firestore-project-repository';
import { CommentModel } from './comment.model';
import { AuthStore } from '../../../authentication/auth-store/auth-store';

@Injectable({
  providedIn: 'root',
})
export class CommentUsecase {
  private readonly _repo = inject(FirestoreProjectRepository);
  private readonly _authStore = inject(AuthStore);

  async addComment(reviewId: string, taskId: string, content: string): Promise<string> {
    const authorId = this._authStore.userId();
    if (!authorId) {
      throw new Error('authorId is missing');
    }

    const data: Omit<CommentModel, 'id' | 'createdAt'> = {
      reviewId,
      taskId,
      content,
      authorId,
    };

    return this._repo.addComment(data);
  }
}
