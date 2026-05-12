import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserCredential } from 'firebase/auth';
import { StoreService } from '../application/store/store-service';
import { AuthStore } from './auth-store';
import { AuthUseCase } from './auth-use-case';
import { RoleModel, UserModel } from './auth.model';
import { TeamModel } from './sign-up/team/team.model';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly _authUseCase = inject(AuthUseCase);
  private readonly _store = inject(StoreService);
  private readonly _authStore = inject(AuthStore);

  readonly userRole = signal<RoleModel | null>(null);
  readonly team = signal<TeamModel | null>(null);
  private readonly _teamName = signal<string | null>(null);
  readonly user = signal<UserModel | null>(null);

  readonly teamsCollection = toSignal(this._store.teams$, { initialValue: null });

  async loginWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return this._authUseCase.login(email, password);
  }

  loginWithGoogle(): void {
    this._authUseCase.loginWithGoogle();
  }

  async signUpWithEmailAndPassword(email: string, password: string): Promise<void> {
    const teamName: string | null = this._teamName();

    if (!teamName) {
      console.error('No teamName');
      return;
    }

    await this.addTeam(teamName);

    const userRole: RoleModel | null = this.userRole() ?? this._authStore.getUserRole();

    if (!userRole) {
      console.error('No userRole or userTeamId');
      return;
    }

    const userData = await this._authUseCase.register(email, password, userRole);

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
    const userId = this._authStore.userId();

    if (!userId) return;

    const result = await this._authUseCase.addTeam(teamName, userId);
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

  setTeamName(teamName: string): void {
    this._teamName.set(teamName);
  }
}
