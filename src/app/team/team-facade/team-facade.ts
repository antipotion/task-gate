import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HistoryService } from '../../application/history/history-service';
import { StoreService } from '../../application/store/store-service';
import { AuthStore } from '../../authentication/auth-store';
import { TeamUsecase } from '../team-usecase/team-usecase';
import { TeamModel } from '../team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamFacade {
  private readonly _store = inject(StoreService);
  private readonly _historyService = inject(HistoryService);
  private readonly _teamUseCase = inject(TeamUsecase);
  private readonly _authStore = inject(AuthStore);

  private readonly _teamName = signal<string | null>(null);
  readonly team = signal<TeamModel | null>(null);
  readonly teams = toSignal<TeamModel[] | null>(this._store.teams$, { initialValue: null });

  goBack(): void {
    this._historyService.goBack();
  }

  async addTeam(teamName: string): Promise<void> {
    const userId = this._authStore.userId();

    if (!userId) return;

    const result = await this._teamUseCase.addTeam(teamName, userId);
    this.team.set(result);
  }

  joinTeam(teamId: string): void {
    const result = this.getTeamById(teamId);
    this.team.set(result);
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
