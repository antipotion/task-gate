import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { StoreService } from '../application/store/store-service';
import { AuthStore } from './auth-store';
import { AuthUseCase } from './auth-use-case';
import { RoleModel, UserModel } from './auth.model';
import { TeamModel } from './sign-up/team/team.model';
import { UserCredential } from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly _authUseCase = inject(AuthUseCase);
  private readonly _store = inject(StoreService);
  private readonly _authStore = inject(AuthStore);

  readonly userRole = signal<RoleModel | null>(null);
  readonly userTeamId = computed<string | null>(() => {
    return this.team()?.id ?? null;
  });
  readonly team = signal<TeamModel | null>(null);
  readonly user = signal<UserModel | null>(null);

  readonly teamsCollection = toSignal(this._store.teams$, { initialValue: null });

  async loginWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return this._authUseCase.login(email, password);
  }

  loginWithGoogle(): void {
    this._authUseCase.loginWithGoogle();
  }

  async signUpWithEmailAndPassword(email: string, password: string): Promise<void> {
    const userRole: RoleModel | null = this.userRole() ?? this._authStore.getUserRole();
    const userTeamId: string | null = this.userTeamId() ?? this._authStore.getTeamId();

    if (!userRole || !userTeamId) {
      console.error('No userRole or userTeamId');
      return;
    }

    const userData = await this._authUseCase.register(email, password, userRole, userTeamId);

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

  async addTeam(teamName: string): Promise<void> {
    const result = await this._authUseCase.addTeam(teamName);
    this.team.set(result);
  }

  joinTeam(teamId: string): void {
    const result = this.getTeamById(teamId);
    this.team.set(result);
  }

  getTeamById(teamId: string): TeamModel | null {
    const result = this.teamsCollection()?.find((teams) => teams.id === teamId);

    if (!result) {
      // TODO: Show this error to the UI
      console.error('No team with such teamId is found');
      return null;
    }

    this._authStore.saveTeamId(result.id);

    return result;
  }
}
