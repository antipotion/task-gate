import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, computed, effect, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ROUTES_PARAMS } from '../../../app.routes';
import { TaskFacade } from '../task-facade';
import { TASK_ROUTE_PARAMS } from '../task.routes';

@Component({
  selector: 'app-task-review-list',
  imports: [MatIconModule, MatCardModule, MatButtonModule, NgClass, TitleCasePipe],
  templateUrl: './task-review-list.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './task-review-list.scss',
})
export class TaskReviewList {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _taskFacade = inject(TaskFacade);

  private readonly _taskId = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(TASK_ROUTE_PARAMS.taskId))),
  );

  readonly isMobile = input<boolean>(false);
  readonly reviewList = computed(() => this._taskFacade.taskReviews());

  constructor() {
    effect(() => {
      const taskId = this._taskId();
      if (!taskId) return;

      this._taskFacade.setTaskIdForReviews(taskId);
    });
  }

  onViewReview(reviewId: string): void {
    this._router.navigate([ROUTES_PARAMS.review, reviewId]);
  }

  onBack(): void {
    const taskId = this._taskId();
    if (!taskId) return;

    this._router.navigate([ROUTES_PARAMS.task, taskId]);
  }
}
