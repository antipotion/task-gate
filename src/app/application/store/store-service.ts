import { inject, Injectable } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, shareReplay, switchMap, type Observable } from 'rxjs';
import { AuthStore } from '../../authentication/auth-store';
import { FirestoreProjectRepository } from '../../infrastructure/firestore/firestore-project-repository';
import type { Project } from '../../project/project.model';
import { Task } from '../../project/task/task.model';
import { TeamModel } from '../../team/team.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly _repo = inject(FirestoreProjectRepository);
  private readonly _authStore = inject(AuthStore);

  readonly tasks$: Observable<Task[]> = this._repo
    .listenToTasks$()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  readonly teams$ = toObservable(this._authStore.userId).pipe(
    filter((userId): userId is string => !!userId),
    switchMap((userId) => {
      return this._repo.listenToTeams$(userId);
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly projects$: Observable<Project[]> = this.teams$.pipe(
    switchMap((teams) => this._repo.listenToProjects$(teams)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

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
