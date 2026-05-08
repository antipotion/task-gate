import { inject, Injectable } from '@angular/core';
import { ProjectRepository } from '../application/repository/project-repository';
import { map, Observable, shareReplay } from 'rxjs';
import { TeamModel } from './sign-up/team/team.model';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly _repo = inject(ProjectRepository);

  readonly teams$: Observable<TeamModel[]> = this._repo
    .listenToTeams$()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  getTeamById(teamId: string): Observable<TeamModel | undefined> {
    return this.teams$.pipe(map((teams) => teams.find((team) => team.id === teamId)));
  }
}
