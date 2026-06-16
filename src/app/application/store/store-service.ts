import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
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

  private readonly projectId = signal<string | null>(null);
  readonly tasks = toSignal(
    toObservable(this.projectId).pipe(
      filter((projectId): projectId is string => !!projectId),
      switchMap((projectId) => this._repo.listenToTasks$(projectId)),
    ),
    { initialValue: null },
  );

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

  getTaskById(taskId: string): Signal<Task | undefined> {
    return computed(() => {
      const tasks = this.tasks();
      if (!tasks) return;

      return tasks.find((task) => task.id === taskId);
    });
  }

  setProjectId(projectId: string): void {
    this.projectId.set(projectId);
  }

  getTeamById(teamId: string): Promise<TeamModel | null> {
    return this._repo.getTeamById(teamId);
  }
}
