import { computed, inject, Injectable, signal } from '@angular/core';
import { UserCredential } from 'firebase/auth';
import { RoleModel, UserModel } from '../auth-model/auth.model';
import { AuthStore } from '../auth-store/auth-store';
import { AuthUsecase } from '../auth-usecase/auth-usecase';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly _authUseCase = inject(AuthUsecase);
  private readonly _authStore = inject(AuthStore);

  readonly userRole = signal<RoleModel | null>(null);
  readonly user = signal<UserModel | null>(null);
  readonly isAuthenticated = computed(() => this._authStore.isAuthenticated());

  async loginWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return this._authUseCase.login(email, password);
  }

  loginWithGoogle(): void {
    this._authUseCase.loginWithGoogle();
  }

  async signUpWithEmailAndPassword(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<void> {
    const userRole: RoleModel | null = this.userRole() ?? this._authStore.getUserRole();

    if (!userRole) {
      console.error('No userRole or userTeamId');
      return;
    }

    const userData = await this._authUseCase.register(
      email,
      password,
      firstName,
      lastName,
      userRole,
    );

    this.user.set(userData);
  }

  setUserRole(role: RoleModel): void {
    this._authStore.saveUserRole(role);
    this.userRole.set(role);
  }

  getUserRole(): void {
    const result = this._authStore.getUserRole();
    this.userRole.set(result);
  }
}
