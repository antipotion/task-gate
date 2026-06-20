import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { StoreService } from '../../../../application/store/store-service';
import { AuthStore } from '../../../../authentication/auth-store';
import { FirestoreProjectRepository } from '../../../../infrastructure/firestore/firestore-project-repository';
import { Task, TaskActionModel, TaskStatus } from '../../task.model';
import { ReviewModel } from '../review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewUsecase {
  private readonly _repo = inject(FirestoreProjectRepository);
  private readonly _authStore = inject(AuthStore);
  private readonly _store = inject(StoreService);

  async addReview(data: Pick<ReviewModel, 'taskId' | 'proofUrls'>): Promise<string> {
    const userId = this._authStore.userId();
    if (!userId) throw new Error('UserId does not exists');

    const activeTask: Task | undefined = await firstValueFrom(
      this._store.getTaskById$(data.taskId),
    );
    if (!activeTask) throw new Error('Task does not exists');

    const completeData: Omit<ReviewModel, 'id' | 'submittedAt'> = {
      taskId: activeTask.id,
      proofUrls: data.proofUrls,
      submittedById: userId,
      reviewerId: activeTask.creatorId,
      closedDate: null,
      closeStatus: null,
    };

    return this._repo.addReview(completeData);
  }

  async closeReview(
    reviewId: string,
    action: Extract<TaskActionModel, 'APPROVE' | 'REJECT'>,
  ): Promise<void> {
    let status: Extract<TaskStatus, 'APPROVED' | 'REJECTED'> | null = null;
    
    switch (action) {
      case 'APPROVE':
        status = 'APPROVED';
        break;
      case 'REJECT':
        status = 'REJECTED';
        break;
      default:
        const _exhaustiveCheck: never = action;
        return _exhaustiveCheck;
    }

    if (!status) {
      throw new Error('Status is missing cannot close review');
    }

    const data: Pick<ReviewModel, 'closeStatus'> = { closeStatus: status };

    return this._repo.closeReview(reviewId, data);
  }
}
