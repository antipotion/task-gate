import { computed, inject, Injectable, signal } from '@angular/core';
import { RoleModel, UserModel } from './auth.model';
import { AuthUseCase } from './auth-use-case';
import { TeamModel } from './sign-up/team/team.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthStore } from './auth-store';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly _authUseCase = inject(AuthUseCase);
  private readonly _authStore = inject(AuthStore);

  readonly userRole = signal<RoleModel | null>(null);
  readonly userTeamId = computed<string | null>(() => {
    return this.team()?.id ?? null;
  });
  readonly team = signal<TeamModel | null>(null);
  readonly user = signal<UserModel | null>(null);

  loginWithEmailAndPassword(email: string, password: string): void {
    this._authUseCase.login(email, password);
  }

  loginWithGoogle(): void {
    this._authUseCase.loginWithGoogle();
  }

  async signUpWithEmailAndPassword(email: string, password: string): Promise<void> {
    const teamIdFromLocalStorage = localStorage.getItem('teamId');
    const userRoleFromLocalStorage = localStorage.getItem('userRole');
    const userRole: RoleModel | null = this.userRole() ?? JSON.parse(userRoleFromLocalStorage ?? '') ?? null;
    const userTeamId: string | null = this.userTeamId() ?? JSON.parse(teamIdFromLocalStorage ?? '') ?? null;
    if (!userRole || !userTeamId) {
      console.error('No userRole or userTeamId');
      return;
    }

    const userData = await this._authUseCase.register(email, password, userRole, userTeamId);
    this.user.set(userData);
    console.log(this.user());
  }

  setUserRole(role: RoleModel): void {
    this._authUseCase.setUserRole(role);
    this.userRole.set(role);
  }

  getUserRole(): void {
    const result = this._authUseCase.getUserRole();
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

  readonly teams = toSignal(this._authStore.teams$, { initialValue: null });

  getTeamById(teamId: string): TeamModel | null {
    const result = this.teams()?.find((teams) => teams.id === teamId) ?? null;
    localStorage.setItem('teamId', JSON.stringify(result?.id));

    return result;
  }
}
