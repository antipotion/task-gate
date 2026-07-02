import { inject, Service } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { AuthStore } from '../../authentication/auth-store/auth-store';
import { FirestoreProjectRepository } from '../../infrastructure/firestore/firestore-project-repository';

@Service()
export class NotificationStore {
  private readonly _repo = inject(FirestoreProjectRepository);
  private readonly _authStore = inject(AuthStore);

  readonly notifications = toSignal(
    toObservable(this._authStore.userId).pipe(
      switchMap((userId) => {
        if (!userId) return of(null);

        return this._repo.listenToNotifications$(userId);
      }),
    ),
  );
}
