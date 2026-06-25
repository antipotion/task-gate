import { computed, inject, Injectable, signal } from '@angular/core';
import { HistoryService } from '../../application/history/history-service';
import { AuthStore } from '../../authentication/auth-store';
import { TeamModel } from '../team-model/team.model';
import { TeamStore } from '../team-store/team-store';
import { TeamUsecase } from '../team-usecase/team-usecase';

@Injectable({
  providedIn: 'root',
})
export class TeamFacade {
  private readonly _historyService = inject(HistoryService);
  private readonly _teamUseCase = inject(TeamUsecase);
  private readonly _authStore = inject(AuthStore);
  private readonly _teamStore = inject(TeamStore);

  private readonly _teamName = signal<string | null>(null);
  readonly team = signal<TeamModel | null>(null);
  readonly teams = computed(() => this._teamStore.teamsList());

  goBack(): void {
    this._historyService.goBack();
  }

  async addTeam(teamName: string): Promise<void> {
    const userId = this._authStore.userId();

    if (!userId) return;

    const result = await this._teamUseCase.addTeam(teamName, userId);
    this.team.set(result);
  }

  async joinTeam(teamId: string): Promise<void> {
    return this._teamUseCase.joinTeam(teamId);
  }

  async leaveTeam(teamId: string): Promise<void> {
    return this._teamUseCase.leaveTeam(teamId);
  }

  getTeamById(teamId: string): TeamModel | null {
    const result = this.teams()?.find((teams) => teams.id === teamId);

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
