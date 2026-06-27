import { inject, Injectable } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { AuthStore } from '../../authentication/auth-store';
import { UserModel } from '../../authentication/auth.model';
import { FirestoreProjectRepository } from '../../infrastructure/firestore/firestore-project-repository';

@Injectable({
  providedIn: 'root',
})
export class TeamStore {
  private readonly _repo = inject(FirestoreProjectRepository);
  private readonly _authStore = inject(AuthStore);

  readonly teamsList = toSignal(
    toObservable(this._authStore.userId).pipe(
      switchMap((userId) => {
        if (!userId) return of(null);

        return this._repo.listenToTeams$(userId);
      }),
    ),
    { initialValue: null },
  );

  async getUsersById(userIds: string[]): Promise<UserModel[] | null> {
    return this._repo.getUsersById(userIds);
  }
}
