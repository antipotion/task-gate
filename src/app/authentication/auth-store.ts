import { computed, inject, Injectable } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { FirebaseAuth } from '../infrastructure/auth/firebase-auth';
import { FirestoreProjectRepository } from '../infrastructure/firestore/firestore-project-repository';
import { SignupSessionStorage } from '../infrastructure/signup-session-storage/signup-session-storage';
import { RoleModel } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly _signupSessionStorage = inject(SignupSessionStorage);
  private readonly _repo = inject(FirestoreProjectRepository);
  private readonly _firebaseAuth = inject(FirebaseAuth);

  readonly userId = computed<string | null>(() => this._firebaseAuth.userId());
  readonly userData = toSignal(
    toObservable(this.userId).pipe(
      filter((userId): userId is string => !!userId),
      switchMap((userId) => this._repo.listenToUser$(userId)),
    ),
    { initialValue: null },
  );
  readonly userFullName = computed<string | null>(() => {
    const userData = this.userData();
    if (!userData) return null;

    const firstName = userData.firstName;
    const lastName = userData.lastName;

    return `${firstName} ${lastName}`;
  });

  getTeamId(): string | null {
    return this._signupSessionStorage.getTeamId();
  }

  getUserRole(): RoleModel | null {
    return this._signupSessionStorage.getUserRole();
  }

  saveTeamId(teamId: string): void {
    this._signupSessionStorage.saveTeamId(teamId);
  }

  saveUserRole(userRole: RoleModel): void {
    this._signupSessionStorage.saveUserRole(userRole);
  }

  clearSessionKeys(): void {
    this._signupSessionStorage.clearSessionKeys();
  }

  async logout(): Promise<void> {
    return this._firebaseAuth.logout();
  }
}
