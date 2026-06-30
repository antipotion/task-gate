import { Component, computed, effect, inject, input, resource, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ROUTES_PARAMS } from '../../../app.routes';
import { Loading } from '../../../loading/loading';
import { ProjectFacade } from '../../project-facade/project-facade';
import { TaskAction } from '../task-action/task-action';
import { TaskEdit } from '../task-edit/task-edit';
import { TaskFacade } from '../task-facade';
import { TaskHeader } from '../task-header/task-header';
import { TaskOverview } from '../task-overview/task-overview';
import { TaskWarningDialog } from '../task-warning-dialog/task-warning-dialog';
import { TaskActionModel } from '../task.model';
import { TASK_ROUTE_PARAMS } from '../task.routes';

@Component({
  selector: 'app-task-details',
  imports: [
    TaskHeader,
    TaskOverview,
    TaskAction,
    MatIconModule,
    MatButtonModule,
    Loading,
    MatMenuModule,
  ],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
})
export class TaskDetails {
  private readonly _taskFacade = inject(TaskFacade);
  private readonly _projectFacade = inject(ProjectFacade);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _dialog = inject(MatDialog);
  private readonly _snackBar = inject(MatSnackBar);

  private readonly _team = resource({
    params: () => this._projectFacade.activeProject()?.teamId,
    loader: ({ params }) => this._projectFacade.getTeamById(params),
  });

  readonly taskId = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(TASK_ROUTE_PARAMS.taskId))),
  );
  readonly activeTask = computed(() => this._taskFacade.taskDataById());
  readonly nextTaskAction = signal<TaskActionModel[] | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly reviews = this._taskFacade.reviewDataList();
  readonly isMobile = input<boolean>(false);
  readonly userId = computed(() => this._taskFacade.userId());

  private readonly _userResource = resource({
    params: () => {
      const activeTask = this.activeTask();
      if (!activeTask) return;

      const creatorId = activeTask.creatorId;
      const assigneeId = activeTask.assigneeId;
      if (!creatorId) return;

      if (!assigneeId) {
        return new Set<string>([creatorId]);
      }
      return new Set<string>([creatorId, assigneeId]);
    },
    loader: ({ params }) => this._taskFacade.getUsersById(params),
  });
  private readonly _userMap = computed<Map<string, string> | null>(() => {
    const userResource = this._userResource.value();
    if (!userResource) return null;

    return new Map<string, string>(
      userResource.map((user) => [user.id, `${user.firstName} ${user.lastName}`]),
    );
  });

  readonly creatorName = computed<string | null>(() => {
    const activeTask = this.activeTask();
    if (!activeTask) return null;

    return this._userMap()?.get(activeTask.creatorId) ?? null;
  });
  readonly assigneeName = computed<string | null>(() => {
    const activeTask = this.activeTask();
    if (!activeTask) return null;

    return this._userMap()?.get(activeTask.assigneeId) ?? null;
  });

  constructor() {
    effect(() => {
      // Getting next task action
      const activeTask = this.activeTask();
      if (!activeTask) return;
      const result = this._taskFacade.nextTaskState(activeTask);
      this.nextTaskAction.set(result ?? null);
    });

    effect(() => {
      const taskId = this.taskId();
      if (!taskId) return;

      this._taskFacade.setTaskIdData(taskId);
    });

    effect(() => {
      const taskId = this.taskId();
      if (!taskId) return;

      this._taskFacade.setTaskIdForReviews(taskId);
    });

    effect(() => {
      const projectId = this.activeTask()?.projectId;
      if (!projectId) return;

      this._projectFacade.selectProject(projectId);
    });
  }

  openTaskEditDialog(): void {
    const activeTask = this.activeTask();
    if (!activeTask) return;

    const team = this._team;
    if (!team) return;
    if (!team.hasValue()) {
      console.error('Team is not present');
    }
    const teamMembers = team.value()?.memberIds;
    const projectId = activeTask.projectId;

    const dialogRef = this._dialog.open(TaskEdit, {
      data: {
        name: activeTask.name,
        description: activeTask.description,
        startDate: activeTask.startDate,
        deadline: activeTask.deadline,
        assigneeId: activeTask.assigneeId ?? '',
        projectId,
        teamMembers,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      const activeTask = this.activeTask();
      if (!activeTask) return;

      const taskId = this.taskId();
      if (!taskId) return;

      try {
        await this._taskFacade.updatetask(taskId, activeTask, result);

        const snackbarRef = this._snackBar.open('Task edited successfully', 'Dismiss', {
          duration: 3000,
        });
        snackbarRef.onAction().subscribe(() => snackbarRef.dismiss());
      } catch (error) {
        console.error('TASK EDIT ERROR', error);
        const snackbarRef = this._snackBar.open('Task edit failed', 'Dismiss', {
          duration: 3000,
          panelClass: 'mat-error-state',
        });
        snackbarRef.onAction().subscribe(() => snackbarRef.dismiss());
      }
    });
  }

  openSnackBar(message: string): void {
    const snackBarRef = this._snackBar.open(message, 'Dismiss', {
      duration: 5000,
    });

    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
  }

  onBack(): void {
    const projectId = this.activeTask()?.projectId;
    if (!projectId) return;

    this.isLoading.set(true);
    // Remove current page from history stack
    this._taskFacade.historyPop();

    this._router.navigate([ROUTES_PARAMS.project, projectId]);
    this.isLoading.set(false);
  }

  openConfirmDeleteDialog(): void {
    const taskName = this.activeTask()?.name;
    if (!taskName) return;

    const dialogRef = this._dialog.open(TaskWarningDialog, {
      data: taskName,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      const projectId = this.activeTask()?.projectId;
      if (!projectId) return;

      const taskid = this.taskId();
      if (!taskid) return;

      if (!result) return;
      try {
        await this._taskFacade.deleteTask(taskid);
        this._router.navigate([ROUTES_PARAMS.project, projectId]);

        const snackbarRef = this._snackBar.open('Task deleted successfully', 'Dismiss', {
          duration: 3000,
        });
        snackbarRef.onAction().subscribe(() => snackbarRef.dismiss());
      } catch (error) {
        console.error('TASK DELETION ERROR', error);

        const snackbarRef = this._snackBar.open('Task deletion failed', 'Dismiss', {
          duration: 3000,
          panelClass: 'mat-error-state',
        });
        snackbarRef.onAction().subscribe(() => snackbarRef.dismiss());
      }
    });
  }

  transitionTask(action: TaskActionModel): void {
    const task = this.activeTask();
    if (!task) throw new Error("Task does not exist can't transition");

    this._taskFacade.advanceTaskState(task, action);
  }

  onShowReviewList(): void {
    const taskId = this.taskId();

    this._router.navigate([ROUTES_PARAMS.task, taskId, TASK_ROUTE_PARAMS.reviewList]);
  }
}
