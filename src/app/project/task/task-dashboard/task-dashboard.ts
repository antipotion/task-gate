import { DatePipe } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskFacade } from '../task-facade';

@Component({
  selector: 'app-task-dashboard',
  imports: [MatProgressSpinnerModule, MatCardModule, DatePipe],
  templateUrl: './task-dashboard.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './task-dashboard.scss',
})
export class TaskDashboard {
  private readonly _taskFacade = inject(TaskFacade);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  readonly taskState = this._taskFacade.tasks;

  onClickTask(taskId: string): void {
    if (!taskId) return;

    this._router.navigate([taskId], { relativeTo: this._route });
  }
}
