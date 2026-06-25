import { DatePipe, NgClass, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Loading } from '../../loading/loading';
import { ProjectFacade } from '../project-facade';
import { Project, ProjectStatusModel } from '../project.model';

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
    MatProgressSpinner,
    SlicePipe,
  ],
  templateUrl: './project-dashboard.html',
  styleUrl: './project-dashboard.scss',
})
export class ProjectDashboard {
  private readonly _projectFacade = inject(ProjectFacade);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  readonly projectsState = computed(() => this._projectFacade.projectState());
  readonly isLoading = signal<boolean>(false);
  readonly teamId = signal<string | null>(null);
  readonly currentTeam = computed(() => {
    const teamId = this.teamId();
    if (!teamId) return;

    return this._projectFacade.getTeamById(teamId);
  });
  readonly teamsMapCollection = signal<Map<string, string>>(new Map());
  readonly projectsStatus = signal<Map<string, ProjectStatusModel | null>>(new Map());

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

    effect(async () => {
      const projectsState = this.projectsState();
      if (projectsState.status !== 'success') return;

      const projects: Project[] = projectsState.data;

      const newProjects = new Map<string, ProjectStatusModel | null>();

      for (const project of projects) {
        const projectId = project.id;
        const status = await this.getProjectStatus(projectId);
        newProjects.set(projectId, status);
      }

      this.projectsStatus.set(newProjects);
    });
  }

  onClickProject(projectId: string): void {
    this.isLoading.set(true);
    this._router.navigate([projectId], { relativeTo: this._route });
    this.isLoading.set(false);
  }

  async getProjectStatus(projectId: string): Promise<ProjectStatusModel | null> {
    const tasks = await this._projectFacade.getProjectTasks(projectId);
    if (!tasks) return null;

    // Vacuous truth: returns true if the array is empty
    if (tasks.every((task) => task.status === 'TODO')) {
      return 'not started';
    }

    if (tasks.every((task) => task.status === 'APPROVED')) {
      return 'completed';
    }

    return 'in progress';
  }

  getProjectDeadlinePressure(projectStartDate: Date | null, projectDeadline: Date | null) {
    return this._projectFacade.getProjectDeadlinePressure(projectStartDate, projectDeadline);
  }
}
