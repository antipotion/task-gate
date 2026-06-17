import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ROUTES_PARAMS } from '../../../app.routes';
import { Loading } from '../../../loading/loading';
import { ProjectFacade } from '../../project-facade';
import { ProjectWarningDialog } from '../../project-warning-dialog/project-warning-dialog';
import { ProjectStatusModel, type Project } from '../../project.model';
import { PROJECT_ROUTE_PARAMS } from '../../project.routes';
import { CreateTask } from '../../task/create-task/create-task';
import { TaskFacade } from '../../task/task-facade';
import { ProjectHeader } from '../project-header/project-header';
import { ProjectOverview } from '../project-overview/project-overview';
import { ProjectTasksBoard } from '../project-tasks-board/project-tasks-board';
import { EditProjectDialog } from './edit-project-dialog/edit-project-dialog';

@Component({
  selector: 'app-project-details',
  imports: [
    ProjectHeader,
    ProjectOverview,
    ProjectTasksBoard,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    Loading,
    MatMenuModule,
  ],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
})
export class ProjectDetails {
  private readonly _projectFacade = inject(ProjectFacade);
  private readonly _taskFacade = inject(TaskFacade);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _dialog = inject(MatDialog);

  private readonly _projectId = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(PROJECT_ROUTE_PARAMS.projectId))),
    { initialValue: null },
  );

  readonly userFullName = computed<string | null>(() => this._projectFacade.userFullName());
  readonly project = computed<Project | null>(() => this._projectFacade.activeProject());
  readonly projectStatus = signal<ProjectStatusModel | null>(null);
  readonly projectDeadlinePressure = computed(() => {
    const project = this.project();

    return this._projectFacade.getProjectDeadlinePressure(
      project?.startDate ?? null,
      project?.deadline ?? null,
    );
  });
  readonly isLoading = signal<boolean>(false);
  readonly overdueTasksCount = computed<number | null>(() =>
    this._projectFacade.tasksOverdueCount(),
  );

  constructor() {
    effect(() => {
      const projectId = this._projectId();
      if (!projectId) return;

      this._projectFacade.selectProject(projectId);

      const projectStatus = this._projectFacade.getProjectStatus(projectId);
      this.projectStatus.set(projectStatus());
    });
  }

  onBack(): void {
    this.isLoading.set(true);
    // Remove current page from the history stack
    this._projectFacade.historyPop();

    this._router.navigate([ROUTES_PARAMS.project]);
    this.isLoading.set(false);
  }

  openEditDialog(): void {
    const project = this.project();
    const projectId = this._projectId();
    if (!projectId) return;

    const dialogRef = this._dialog.open(EditProjectDialog, {
      data: {
        name: this.project()?.name,
        startDate: project?.startDate,
        deadline: project?.deadline,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // TODO: Handle the result of the operation (e.g. Success | Error)
      this._projectFacade.updateProject(projectId, result);
    });
  }

  openAddTaskDialog(): void {
    const dialogRef = this._dialog.open(CreateTask);
    const projectId = this._projectId();
    if (!projectId) return;

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      // TODO: Handle the result of the operation (e.g. Success | Error)
      this._taskFacade.addTask(projectId, result);
    });
  }

  onDelete(): void {
    const projectId = this.project()?.id;
    if (!projectId) return;

    this.openConfirmDeleteDialog(projectId);
  }

  openConfirmDeleteDialog(projectId: string): void {
    const projectName = this.project()?.name;
    if (!projectName) return;

    const dialogRef = this._dialog.open(ProjectWarningDialog, {
      data: projectName,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;

      this.isLoading.set(true);
      await this._projectFacade.deleteProject(projectId);
      this._router.navigate([ROUTES_PARAMS.project]);
      this.isLoading.set(false);
    });
  }

  getProjectProgress(): number | null {
    return this._projectFacade.getProjectProgress();
  }
}
