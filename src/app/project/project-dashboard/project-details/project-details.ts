import { Component, computed, inject, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_PARAMS } from '../../../app.routes';
import { ProjectFacade } from '../../project-facade';
import { ProjectWarningDialog } from '../../project-warning-dialog/project-warning-dialog';
import { ProjectStatusModel, type Project } from '../../project.model';
import { PROJECT_ROUTE_PARAMS } from '../../project.routes';
import { CreateTask } from '../../task/create-task/create-task';
import { TaskFacade } from '../../task/task-facade';
import { ProjectActivityFeed } from '../project-activity-feed/project-activity-feed';
import { ProjectHeader } from '../project-header/project-header';
import { ProjectMetrics } from '../project-metrics/project-metrics';
import { ProjectOverview } from '../project-overview/project-overview';
import { ProjectTasksBoard } from '../project-tasks-board/project-tasks-board';
import { EditProjectDialog } from './edit-project-dialog/edit-project-dialog';

@Component({
  selector: 'app-project-details',
  imports: [
    ProjectHeader,
    ProjectOverview,
    ProjectMetrics,
    ProjectTasksBoard,
    ProjectActivityFeed,
    MatButtonModule,
    MatIconModule,
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

  private readonly _projectId =
    this._route.snapshot.paramMap.get(PROJECT_ROUTE_PARAMS.projectId) || '';

  readonly userFullName = computed<string | null>(() => this._projectFacade.userFullName());
  readonly project = computed<Project | null>(() => this._projectFacade.activeProject());
  readonly projectStatus: Signal<ProjectStatusModel | null> = this._projectFacade.getProjectStatus(
    this._projectId,
  );
  readonly projectDeadlinePressure = computed(() => {
    const project = this.project();

    return this._projectFacade.getProjectDeadlinePressure(
      project?.startDate ?? null,
      project?.deadline ?? null,
    );
  });

  ngOnInit(): void {
    this._projectFacade.selectProject(this._projectId);
  }

  onBack(): void {
    this._projectFacade.goBack();
  }

  openEditDialog(): void {
    const project = this.project();
    const dialogRef = this._dialog.open(EditProjectDialog, {
      data: {
        name: this.project()?.name,
        startDate: project?.startDate,
        deadline: project?.deadline,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      // TODO: Handle the result of the operation (e.g. Success | Error)
      this._projectFacade.updateProject(this._projectId, result);
    });
  }

  openAddTaskDialog(): void {
    const dialogRef = this._dialog.open(CreateTask);

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      // TODO: Handle the result of the operation (e.g. Success | Error)
      this._taskFacade.addTask(this._projectId, result);
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

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this._projectFacade.deleteProject(projectId);
      this._router.navigate([ROUTES_PARAMS.project]);
    });
  }
}
