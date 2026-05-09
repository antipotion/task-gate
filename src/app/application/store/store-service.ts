import { inject, Injectable } from '@angular/core';
import { map, shareReplay, type Observable } from 'rxjs';
import { TeamModel } from '../../authentication/sign-up/team/team.model';
import type { Project } from '../../project/project.model';
import { Task } from '../../project/task/task.model';
import { ProjectRepository } from '../repository/project-repository';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly _repo = inject(ProjectRepository);

  readonly projects$: Observable<Project[]> = this._repo
    .listenToProjects$()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  readonly tasks$: Observable<Task[]> = this._repo
    .listenToTasks$()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  readonly teams$: Observable<TeamModel[]> = this._repo
    .listenToTeams$()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  getProjectById$(projectId: string): Observable<Project | undefined> {
    return this.projects$.pipe(
      map((projects) => projects.find((project) => project.id === projectId)),
    );
  }

  getTaskById$(taskId: string): Observable<Task | undefined> {
    return this.tasks$.pipe(map((tasks) => tasks.find((task) => task.id === taskId)));
  }

  getTeamById(teamId: string): Observable<TeamModel | undefined> {
    return this.teams$.pipe(map((teams) => teams.find((team) => team.id === teamId)));
  }
}
