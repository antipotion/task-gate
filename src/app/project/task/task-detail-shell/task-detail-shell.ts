import {
  Component,
  computed,
  effect,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { MobileShell } from '../../../layout-shell/mobile-shell/mobile-shell';
import { TabletShell } from '../../../layout-shell/tablet-shell/tablet-shell';
import { TaskDetails } from '../task-details/task-details';
import { TaskFacade } from '../task-facade';
import { TaskReviewList } from '../task-review-list/task-review-list';
import { TASK_ROUTE_PARAMS } from '../task.routes';

@Component({
  selector: 'app-task-detail-shell',
  imports: [MobileShell, TaskDetails, TabletShell, TaskReviewList],
  templateUrl: './task-detail-shell.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './task-detail-shell.scss',
})
export class TaskDetailShell {
  private readonly _taskFacade = inject(TaskFacade);
  private readonly _route = inject(ActivatedRoute);

  readonly isMobileScreen = computed<boolean>(() => this._taskFacade.isMobileScreen());
  readonly routeSegments = toSignal(this._route.url, { initialValue: null });
  readonly routeReviewList = signal<boolean>(false);

  constructor() {
    effect((onCleanUp) => {
      const routeSegments = this.routeSegments();
      if (!routeSegments) return;

      const reviewList = routeSegments[1];
      if (!reviewList) return;
      if (reviewList.toString() !== TASK_ROUTE_PARAMS.reviewList) return;

      this.routeReviewList.set(true);

      onCleanUp(() => this.routeReviewList.set(false));
    });
  }
}
