import { Component, computed, effect, inject, signal, type OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskComment } from '../task-comment/task-comment';
import { TaskDependency } from '../task-dependency/task-dependency';
import { TaskEdit } from '../task-edit/task-edit';
import { TaskFacade } from '../task-facade';
import { TaskHeader } from '../task-header/task-header';
import { TaskHistory } from '../task-history/task-history';
import { TaskOverview } from '../task-overview/task-overview';
import { TaskStatus } from '../task-status/task-status';
import { TaskSubtask } from '../task-subtask/task-subtask';
import { TaskTime } from '../task-time/task-time';
import { TASK_ROUTE_PARAMS } from '../task.routes';
import { TaskWarningDialog } from '../task-warning-dialog/task-warning-dialog';
import { TaskAction } from '../task.model';

@Component({
  selector: 'app-task-details',
  imports: [
    TaskHeader,
    TaskOverview,
    TaskStatus,
    TaskDependency,
    TaskSubtask,
    TaskTime,
    TaskComment,
    TaskHistory,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
})
export class TaskDetails implements OnInit {
  private taskFacade = inject(TaskFacade);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  taskId = this.route.snapshot.paramMap.get(TASK_ROUTE_PARAMS.TASK_ID) || '';

  activeTask = computed(() => this.taskFacade.activeTask());
  nextTaskAction = signal<TaskAction | null>(null)

  constructor() {
    effect(() => {
      // Getting next task action
      const activeTask = this.activeTask();
      if (!activeTask) return;
      const result = this.taskFacade.nextTaskState(activeTask);
      this.nextTaskAction.set(result ?? null);
    });
  }

  ngOnInit(): void {
    this.taskFacade.selectTaskId(this.taskId);
  }

  openTaskEditDialog(): void {
    const dialogRef = this.dialog.open(TaskEdit, {
      data: {
        name: this.activeTask()?.name,
        description: this.activeTask()?.description,
        deadline: this.activeTask()?.deadline,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const activeTask = this.activeTask();
      if (!activeTask) return;

      try {
        this.taskFacade.updatetask(this.taskId, activeTask, result);
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

  onBack(projectId: string | undefined): void {
    if (!projectId) return;
    
    this.router.navigate(['project', projectId]);
  }

  openConfirmDeleteDialog(): void {
    const taskName = this.activeTask()?.name;
    if (!taskName) return;
    
    const dialogRef = this.dialog.open(TaskWarningDialog, {
      data: taskName,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.taskFacade.deleteTask(this.taskId);
      this.router.navigate(['']);
    });
  }

  transitionTask(action: TaskAction): void {
    const task = this.activeTask();
    if (!task) throw new Error('Task does not exist can\'t transition');
    
    this.taskFacade.advanceTaskState(task, action);
  }
}
