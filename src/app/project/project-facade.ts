import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith } from 'rxjs';
import { HistoryService } from '../application/history/history-service';
import { StoreService } from '../application/store/store-service';
import { AuthStore } from '../authentication/auth-store';
import { TeamModel } from '../team/team.model';
import { ProjectUseCase } from './project-use-case';
import type { DeadlinePressureModel, Project, ProjectStatusModel } from './project.model';
import { TaskFacade } from './task/task-facade';
import { Task } from './task/task.model';
import { getDeadlinePressure } from './utility/deadlinePressureCalculator';

export type ProjectState =
  | { status: 'loading' }
  | { status: 'success'; data: Project[] }
  | { status: 'error'; error: string };

@Injectable()
export class ProjectFacade {
  private readonly _storeService = inject(StoreService);
  private readonly _projectUseCase = inject(ProjectUseCase);
  private readonly _authStore = inject(AuthStore);
  private readonly _taskFacade = inject(TaskFacade);
  private readonly _historyService = inject(HistoryService);

  readonly userFullName = computed<string | null>(() => this._authStore.userFullName());
  readonly tasksOverdueCount = computed<number | null>(() => {
    const overdueTasks: Task[] | null = this.getOverdueTasks()();
    if (!overdueTasks) return null;

    return overdueTasks.length;
  });
  readonly tasks = computed(() => this._taskFacade.tasks());

  readonly projectState = toSignal(
    this._storeService.projects$.pipe(
      map(
        (projects): ProjectState => ({
          status: 'success',
          data: projects,
        }),
      ),
      startWith({ status: 'loading' } as ProjectState),
      catchError((error) => of({ status: 'error', error: String(error) } as ProjectState)),
    ),
    { initialValue: { status: 'loading' } },
  );

  private readonly selectedProjectId = signal<string | null>(null);

  readonly activeProject = computed<Project | null>(() => {
    const state = this.projectState();
    const id = this.selectedProjectId();

    if (state.status !== 'success' || !id) return null;

    return state.data.find((p) => p.id === id) ?? null;
  });

  getProjectStatus(projectId: string): Signal<ProjectStatusModel | null> {
    return computed(() => {
      const tasks = this._taskFacade.tasks();
      if (!tasks) return null;

      const projectTasks = tasks.filter((task) => task.projectId === projectId);

      // Vacuous truth: returns true if the array is empty
      if (projectTasks.every((task) => task.status === 'TODO')) {
        return 'not started';
      }

      if (projectTasks.every((task) => task.status === 'APPROVED')) {
        return 'completed';
      }

      return 'in progress';
    });
  }

  getProjectDeadlinePressure(
    projectStartDate: Date | null,
    projectDeadline: Date | null,
  ): DeadlinePressureModel | null {
    const startDate = projectStartDate;
    const deadline = projectDeadline;

    return getDeadlinePressure(startDate, deadline);
  }

  addProject(project: Omit<Project, 'id' | 'creatorId'>): Promise<string> {
    return this._projectUseCase.addProject(project);
  }

  selectProject(projectId: string): void {
    this.selectedProjectId.set(projectId);
  }

  async updateProject(id: string, dto: Partial<Project>): Promise<void> {
    const state = this.projectState();

    if (state.status !== 'success') return;

    const project = state.data.find((project) => project.id === id);
    if (!project) {
      console.error('Project not found');
      return;
    }

    return await this._projectUseCase.updateProject(id, project, dto);
  }

  async deleteProject(id: string): Promise<void> {
    return this._projectUseCase.deleteProject(id);
  }

  async logout(): Promise<void> {
    return this._authStore.logout();
  }

  goBack(): void {
    this._historyService.goBack();
  }

  historyPop(): void {
    this._historyService.historyStackPop();
  }

  async getTeamById(teamId: string): Promise<TeamModel | null> {
    const team = await this._storeService.getTeamById(teamId);
    if (!team) return null;

    return team;
  }

  getProjectProgress(): number | null {
    const projectTasks: Task[] | null = this._taskFacade.tasks();
    if (!projectTasks) return null;

    const taskTotal = projectTasks.length;
    const taskDone = projectTasks.filter((tasks) => tasks.status === 'APPROVED');
    const currentProgress = (taskDone.length / taskTotal) * 100;

    return currentProgress;
  }

  getOverdueTasks(): Signal<Task[] | null> {
    const currentDate = new Date();

    const tasks = this._taskFacade.tasks();
    if (!tasks) return computed(() => null);

    const result = tasks.filter(
      (tasks) => tasks.deadline && tasks.deadline < currentDate && tasks.status !== 'APPROVED',
    );
    return computed(() => result);
  }

  setProjectIdForTask(projectId: string): void {
    this._storeService.setProjectId(projectId);
  }

  async getProjectTasks(projectId: string): Promise<Task[]> {
    return this._storeService.getProjectTasks(projectId);
  }
}
