import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_PARAMS } from '../../app.routes';
import { Loading } from '../../loading/loading';
import { TEAM_ROUTE_PARAMS } from '../../team/team.routes';
import { ProjectFacade } from '../project-facade';
import { PROJECT_ROUTE_PARAMS } from '../project.routes';

@Component({
  selector: 'app-project-dashboard',
  imports: [MatProgressSpinner, MatCardModule, DatePipe, MatButtonModule, MatIconModule, Loading],
  templateUrl: './project-dashboard.html',
  styleUrl: './project-dashboard.scss',
})
export class ProjectDashboard {
  private readonly _projectFacade = inject(ProjectFacade);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  readonly projectsState = computed(() => this._projectFacade.projectState());
  readonly logoutLoading = signal<boolean>(false);
  readonly isLoading = signal<boolean>(false);

  onClickProject(projectId: string): void {
    this.isLoading.set(true);
    this._router.navigate([projectId], { relativeTo: this._route });
    this.isLoading.set(false);
  }

  onAddProject(): void {
    this.isLoading.set(true);
    this._router.navigate([PROJECT_ROUTE_PARAMS.create], { relativeTo: this._route });
    this.isLoading.set(false);
  }

  async onLogout(): Promise<void> {
    this.logoutLoading.set(true);
    try {
      await this._projectFacade.logout();
      this._router.navigate(['']);
    } finally {
      this.logoutLoading.set(false);
    }
  }

  onViewTeams(): void {
    this.isLoading.set(true);
    this._router.navigate([ROUTES_PARAMS.teams, TEAM_ROUTE_PARAMS.teamDashboard]);
    this.isLoading.set(false);
  }
}
