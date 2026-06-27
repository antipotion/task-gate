import { computed, inject, Injectable } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { FirebaseAuth } from '../infrastructure/auth/firebase-auth';
import { FirestoreProjectRepository } from '../infrastructure/firestore/firestore-project-repository';
import { SignupSessionStorage } from '../infrastructure/signup-session-storage/signup-session-storage';
import { RoleModel, UserModel } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly _signupSessionStorage = inject(SignupSessionStorage);
  private readonly _repo = inject(FirestoreProjectRepository);
  private readonly _firebaseAuth = inject(FirebaseAuth);

  readonly isAuthenticated = computed(() => this._firebaseAuth.isAuthenticated());
  readonly userId = computed<string | null>(() => this._firebaseAuth.userId());
  readonly userData = toSignal<UserModel | null>(
    toObservable(this.userId).pipe(
      switchMap((userId) => {
        if (!userId) {
          return of(null);
        }

        return this._repo.listenToUser$(userId);
      }),
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

  async getUserById(userId: string): Promise<UserModel | null> {
    return this._repo.getUserById(userId);
  }
}
