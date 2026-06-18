import { DatePipe, NgClass, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_PARAMS } from '../../app.routes';
import { Loading } from '../../loading/loading';
import { TEAM_ROUTE_PARAMS } from '../../team/team.routes';
import { ProjectFacade } from '../project-facade';
import { Project, ProjectStatusModel } from '../project.model';
import { PROJECT_ROUTE_PARAMS } from '../project.routes';

@Component({
  selector: 'app-project-dashboard',
  imports: [
    MatProgressSpinner,
    MatCardModule,
    DatePipe,
    MatButtonModule,
    MatIconModule,
    Loading,
    NgClass,
    TitleCasePipe,
    UpperCasePipe,
  ],
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
  readonly teamId = signal<string | null>(null);
  readonly currentTeam = computed(() => {
    const teamId = this.teamId();
    if (!teamId) return;

    return this._projectFacade.getTeamById(teamId);
  });
  readonly teamsMapCollection = signal<Map<string, string>>(new Map());
  readonly projectsStatus = signal<Map<string, Signal<ProjectStatusModel | null>>>(new Map());

  constructor() {
    effect(async () => {
      const projectStatus = this.projectsState();
      if (projectStatus.status !== 'success') return;

      const projects: Project[] = projectStatus.data;
      for (const project of projects) {
        const teamId = project.teamId;

        // Check if the teamId is already recorded
        if (this.teamsMapCollection().has(teamId)) {
          continue;
        }

        const team = await this._projectFacade.getTeamById(teamId);
        if (!team) continue;

        const teamName = team.name;
        this.teamsMapCollection.update((teams) => {
          const newTeams = new Map(teams);
          newTeams.set(teamId, teamName);

          return newTeams;
        });
      }
    });

    effect(() => {
      const projectsState = this.projectsState();
      if (projectsState.status !== 'success') return;

      const projects: Project[] = projectsState.data;

      this.projectsStatus.update((oldProjects) => {
        const newProjects = new Map(oldProjects);

        for (const project of projects) {
          const projectId = project.id;
          const status = this.getProjectStatus(projectId);
          this._projectFacade.setProjectIdForTask(projectId);
          newProjects.set(projectId, status);
        }

        return newProjects;
      });
    });
  }

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

  getProjectStatus(projectId: string): Signal<ProjectStatusModel | null> {
    return this._projectFacade.getProjectStatus(projectId);
  }

  getProjectDeadlinePressure(projectStartDate: Date | null, projectDeadline: Date | null) {
    return this._projectFacade.getProjectDeadlinePressure(projectStartDate, projectDeadline);
  }
}
