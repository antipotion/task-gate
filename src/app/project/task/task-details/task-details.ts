import { Component, computed, effect, inject, signal, type OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_PARAMS } from '../../../app.routes';
import { Loading } from '../../../loading/loading';
import { TaskAction } from '../task-action/task-action';
import { TaskComment } from '../task-comment/task-comment';
import { TaskDependency } from '../task-dependency/task-dependency';
import { TaskEdit } from '../task-edit/task-edit';
import { TaskFacade } from '../task-facade';
import { TaskHeader } from '../task-header/task-header';
import { TaskHistory } from '../task-history/task-history';
import { TaskOverview } from '../task-overview/task-overview';
import { TaskReviewList } from '../task-review-list/task-review-list';
import { TaskSubtask } from '../task-subtask/task-subtask';
import { TaskTime } from '../task-time/task-time';
import { TaskWarningDialog } from '../task-warning-dialog/task-warning-dialog';
import { TaskActionModel } from '../task.model';
import { TASK_ROUTE_PARAMS } from '../task.routes';

@Component({
  selector: 'app-task-details',
  imports: [
    TaskHeader,
    TaskOverview,
    TaskAction,
    TaskDependency,
    TaskSubtask,
    TaskTime,
    TaskComment,
    TaskHistory,
    MatIconModule,
    MatButtonModule,
    Loading,
    TaskReviewList,
  ],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
})
export class TaskDetails implements OnInit {
  private readonly _taskFacade = inject(TaskFacade);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _dialog = inject(MatDialog);
  private readonly _snackBar = inject(MatSnackBar);

  readonly taskId = this._route.snapshot.paramMap.get(TASK_ROUTE_PARAMS.taskId) || '';

  readonly activeTask = computed(() => this._taskFacade.activeTask());
  readonly nextTaskAction = signal<TaskActionModel | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly reviews = this._taskFacade.reviewDataList();

  constructor() {
    effect(() => {
      // Getting next task action
      const activeTask = this.activeTask();
      if (!activeTask) return;
      const result = this._taskFacade.nextTaskState(activeTask);
      this.nextTaskAction.set(result ?? null);
    });

    this._taskFacade.setTaskId(this.taskId);
  }

  ngOnInit(): void {
    this._taskFacade.selectTaskId(this.taskId);
  }

  openTaskEditDialog(): void {
    const dialogRef = this._dialog.open(TaskEdit, {
      data: {
        name: this.activeTask()?.name,
        description: this.activeTask()?.description,
        startDate: this.activeTask()?.startDate,
        deadline: this.activeTask()?.deadline,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const activeTask = this.activeTask();
      if (!activeTask) return;

      try {
        this._taskFacade.updatetask(this.taskId, activeTask, result);
      } catch (error) {
        this.openSnackBar('Task edit failed');
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

    dialogRef.afterClosed().subscribe((result) => {
      const projectId = this.activeTask()?.projectId;
      if (!projectId) return;

      if (!result) return;
      this._taskFacade.deleteTask(this.taskId);
      this._router.navigate([ROUTES_PARAMS.project, projectId]);
    });
  }

  transitionTask(action: TaskActionModel): void {
    const task = this.activeTask();
    if (!task) throw new Error("Task does not exist can't transition");

    this._taskFacade.advanceTaskState(task, action);
  }
}
