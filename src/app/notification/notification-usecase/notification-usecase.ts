import { Service } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import { FirestoreProjectRepository } from '../../infrastructure/firestore/firestore-project-repository';
import { NotificationDTOModel, NotificationModel } from '../notification.model';

@Service()
export class NotificationUsecase {
  private readonly _repo = inject(FirestoreProjectRepository);

  async addNotification(data: Omit<NotificationDTOModel, 'createdAt'>): Promise<void> {
    return this._repo.addNotification(data);
  }

  async updateNotification(data: NotificationModel): Promise<void> {
    const hasRead: NotificationModel = { ...data, isRead: true };

    return this._repo.updateNotification(hasRead);
  }
}
