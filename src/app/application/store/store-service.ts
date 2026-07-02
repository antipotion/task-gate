import { computed, inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, concat, of, switchMap } from 'rxjs';
import { AuthStore } from '../../authentication/auth-store/auth-store';
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
  private readonly _authStore = inject(AuthStore);

  private readonly _projectId = signal<string | null>(null);
  private readonly _taskId = signal<string | null>(null);
  private readonly _userId = computed(() => this._authStore.userId());

  readonly tasks = toSignal(
    combineLatest([toObservable(this._projectId), toObservable(this._userId)]).pipe(
      switchMap(([projectId, userId]) => {
        if (!projectId) {
          return of(null);
        }

        if (!userId) {
          return of(null);
        }

        return concat(this._repo.listenToTasks$(projectId));
      }),
    ),
    { initialValue: null },
  );

  readonly teamsList = computed(() => this._teamStore.teamsList());

  readonly projects = toSignal(
    combineLatest([toObservable(this.teamsList), toObservable(this._userId)]).pipe(
      switchMap(([teams, userId]) => {
        if (!teams) return of(null);

        if (!userId) {
          return of(null);
        }

        return this._repo.listenToProjects$(teams);
      }),
    ),
    { initialValue: null },
  );

  readonly taskDataById = toSignal<Task | null>(
    combineLatest([toObservable(this._taskId), toObservable(this._userId)]).pipe(
      switchMap(([taskId, userId]) => {
        if (!taskId) {
          return of(null);
        }

        if (!userId) {
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
