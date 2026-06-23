import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { NavigationService } from '../navigation/navigation-service';
import { MobileShell } from './mobile-shell/mobile-shell';
import { TabletShell } from './tablet-shell/tablet-shell';

@Component({
  selector: 'app-layout-shell',
  imports: [MobileShell, TabletShell],
  templateUrl: './layout-shell.html',
  styleUrl: './layout-shell.scss',
})
export class LayoutShell {
  private readonly _breakpointObserver = inject(BreakpointObserver);
  private readonly _navigationService = inject(NavigationService);

  private readonly mobileScreen = '(max-width: 768px)';

  readonly isMobileScreen = toSignal(
    this._breakpointObserver.observe(this.mobileScreen).pipe(map((state) => state.matches)),
    { initialValue: this._breakpointObserver.isMatched(this.mobileScreen) },
  );

  readonly routeProject = computed(() => this._navigationService.routeProject());
  readonly routeProjectId = computed(() => this._navigationService.routeProjectId());
  readonly routeProjectTaskCategory = computed(() =>
    this._navigationService.routeProjectTaskCategory(),
  );
  readonly routeTask = computed(() => this._navigationService.routeTask());
  readonly routeTaskId = computed(() => this._navigationService.routeTaskId());
  readonly routeTaskReviewList = computed(() => this._navigationService.routeTaskReviewList());
  readonly routeTeam = computed(() => this._navigationService.routeTeam());
  readonly routeTeamId = computed(() => this._navigationService.routeTeamId());
  readonly routeReview = computed(() => this._navigationService.routeReview());
  readonly routeReviewId = computed(() => this._navigationService.routeReviewId());
  readonly routeDiscussion = computed(() => this._navigationService.routeDiscussion());
}
