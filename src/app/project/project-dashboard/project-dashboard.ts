import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectFacade } from '../../application/facades/project-facade';

@Component({
  selector: 'app-project-dashboard',
  imports: [MatProgressSpinner, MatCardModule, DatePipe],
  templateUrl: './project-dashboard.html',
  styleUrl: './project-dashboard.scss',
})
export class ProjectDashboard {
  private projectFacade = inject(ProjectFacade);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  projectsState = computed(() => this.projectFacade.state());

  onClickProject(projectId: string): void {
    this.router.navigate([projectId], { relativeTo: this.route });
  }
}
