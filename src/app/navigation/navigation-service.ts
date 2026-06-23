import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ROUTES_PARAMS } from '../app.routes';
import { PROJECT_ROUTE_PARAMS } from '../project/project.routes';
import { REVIEW_ROUTE_PARAMS } from '../project/task/review/review.routes';
import { TASK_ROUTE_PARAMS } from '../project/task/task.routes';
import { TEAM_ROUTE_PARAMS } from '../team/team.routes';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly _route = inject(ActivatedRoute);
  private readonly _breakpointObserver = inject(BreakpointObserver);
  
  private readonly mobileScreen = '(max-width: 768px)';

  readonly isMobileScreen = toSignal(
    this._breakpointObserver.observe(this.mobileScreen).pipe(map((state) => state.matches)),
    { initialValue: this._breakpointObserver.isMatched(this.mobileScreen) },
  );

  readonly routeProject = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(ROUTES_PARAMS.project))),
    { initialValue: null },
  );

  readonly routeProjectId = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(PROJECT_ROUTE_PARAMS.projectId))),
    { initialValue: null },
  );

  readonly routeProjectTaskCategory = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(PROJECT_ROUTE_PARAMS.taskCategory))),
    { initialValue: null },
  );

  readonly routeTask = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(ROUTES_PARAMS.task))),
    { initialValue: null },
  );

  readonly routeTaskId = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(TASK_ROUTE_PARAMS.taskId))),
    { initialValue: null },
  );

  readonly routeTaskReviewList = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(TASK_ROUTE_PARAMS.reviewList))),
    { initialValue: null },
  );

  readonly routeTeam = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(ROUTES_PARAMS.teams))),
    { initialValue: null },
  );

  readonly routeTeamId = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(TEAM_ROUTE_PARAMS.teamId))),
    { initialValue: null },
  );

  readonly routeReview = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(ROUTES_PARAMS.review))),
    { initialValue: null },
  );

  readonly routeReviewId = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(REVIEW_ROUTE_PARAMS.reviewId))),
    { initialValue: null },
  );

  readonly routeDiscussion = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(REVIEW_ROUTE_PARAMS.discussion))),
    { initialValue: null },
  );
}
