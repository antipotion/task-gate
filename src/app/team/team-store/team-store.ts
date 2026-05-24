import { inject, Injectable } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { AuthStore } from '../../authentication/auth-store';
import { FirestoreProjectRepository } from '../../infrastructure/firestore/firestore-project-repository';

@Injectable({
  providedIn: 'root',
})
export class TeamStore {
  private readonly _repo = inject(FirestoreProjectRepository);
  private readonly _authStore = inject(AuthStore);

  readonly teamsList = toSignal(
    toObservable(this._authStore.userId).pipe(
      filter((userId): userId is string => !!userId),
      switchMap((userId) => this._repo.listenToTeams$(userId)),
    ),
    { initialValue: [] },
  );
}
