import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectFacade } from '../project-facade';

@Component({
  selector: 'app-project-dashboard',
  imports: [MatProgressSpinner, MatCardModule, DatePipe, MatButtonModule, MatIconModule],
  templateUrl: './project-dashboard.html',
  styleUrl: './project-dashboard.scss',
})
export class ProjectDashboard {
  private readonly _projectFacade = inject(ProjectFacade);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  readonly projectsState = computed(() => this._projectFacade.projectState());

  onClickProject(projectId: string): void {
    this._router.navigate([projectId], { relativeTo: this._route });
  }

  onAddProject(): void {
    this._router.navigate(['create'], { relativeTo: this._route });
  }
}
