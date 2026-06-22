import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, shareReplay, switchMap, type Observable } from 'rxjs';
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

  private readonly _projectId = signal<string | null>(null);
  private readonly _taskId = signal<string | null>(null);

  readonly tasks = toSignal(
    toObservable(this._projectId).pipe(
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

  readonly taskDataById = toSignal<Task | null>(
    toObservable(this._taskId).pipe(
      filter((taskId): taskId is string => !!taskId),
      switchMap((taskId) => this._repo.listenToTask$(taskId)),
    ),
    { initialValue: null },
  );

  getTaskById(taskId: string): Signal<Task | undefined> {
    return computed(() => {
      const tasks = this.tasks();
      if (!tasks) return;

      return tasks.find((task) => task.id === taskId);
    });
  }

  setProjectId(projectId: string): void {
    this._projectId.set(projectId);
  }

  getTeamById(teamId: string): Promise<TeamModel | null> {
    return this._repo.getTeamById(teamId);
  }

  setTaskId(taskId: string): void {
    this._taskId.set(taskId);
  }

  async getProjectTasks(projectId: string): Promise<Task[]> {
    return this._repo.getProjectTasks(projectId);
  }
}
