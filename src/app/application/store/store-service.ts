import { computed, inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { concat, of, switchMap } from 'rxjs';
import { FirestoreProjectRepository } from '../../infrastructure/firestore/firestore-project-repository';
import { Task } from '../../project/task/task.model';
import { TeamModel } from '../../team/team-model/team.model';
import { TeamStore } from '../../team/team-store/team-store';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly _repo = inject(FirestoreProjectRepository);
  private readonly _teamStore = inject(TeamStore);

  private readonly _projectId = signal<string | null>(null);
  private readonly _taskId = signal<string | null>(null);

  readonly tasks = toSignal(
    toObservable(this._projectId).pipe(
      switchMap((projectId) => {
        if (!projectId) {
          return of(null);
        }

        return concat(this._repo.listenToTasks$(projectId));
      }),
    ),
    { initialValue: null },
  );

  readonly teamsList = computed(() => this._teamStore.teamsList());

  readonly projects = toSignal(
    toObservable(this.teamsList).pipe(
      switchMap((teams) => {
        if (!teams) return of(null);

        return this._repo.listenToProjects$(teams);
      }),
    ),
    { initialValue: null },
  );

  readonly taskDataById = toSignal<Task | null>(
    toObservable(this._taskId).pipe(
      switchMap((taskId) => {
        if (!taskId) {
          return of(null);
        }

        return this._repo.listenToTask$(taskId);
      }),
    ),
    { initialValue: null },
  );

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
