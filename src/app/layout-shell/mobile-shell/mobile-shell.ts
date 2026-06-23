import { Component, computed, inject } from '@angular/core';
import { NavigationService } from '../../navigation/navigation-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mobile-shell',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './mobile-shell.html',
  styleUrl: './mobile-shell.scss',
})
export class MobileShell {
  private readonly _navigationService = inject(NavigationService);

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
