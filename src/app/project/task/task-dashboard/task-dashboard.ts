import { Component, inject } from '@angular/core';
import { TaskFacade } from '../task-facade';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-dashboard',
  imports: [MatProgressSpinnerModule, MatCardModule, DatePipe],
  templateUrl: './task-dashboard.html',
  styleUrl: './task-dashboard.scss',
})
export class TaskDashboard {
  private readonly _taskFacade = inject(TaskFacade);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  readonly taskState = this._taskFacade.taskState;

  onClickTask(taskId: string): void {
    if (!taskId) return;
    
    this._router.navigate([taskId], {relativeTo: this._route});
  }
}
