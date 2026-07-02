import { DatePipe, NgClass, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Loading } from '../../loading/loading';
import { ProjectFacade } from '../project-facade/project-facade';
import { ProjectStatusModel } from '../project-model/project.model';
import { MatRippleModule } from '@angular/material/core';

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
    MatRippleModule,
  ],
  templateUrl: './project-dashboard.html',
  styleUrl: './project-dashboard.scss',
})
export class ProjectDashboard {
  private readonly _projectFacade = inject(ProjectFacade);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  readonly projects = computed(() => this._projectFacade.projects());
  readonly isLoading = signal<boolean>(false);

  onClickProject(projectId: string): void {
    this.isLoading.set(true);
    this._router.navigate([projectId], { relativeTo: this._route });
    this.isLoading.set(false);
  }

  constructor() {
    effect(() => {
      this.isLoading.set(true);
      
      const projects = this.projects()
      if (!projects) return;

      this.isLoading.set(false);
    });
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
