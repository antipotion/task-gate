import { Component, computed, inject, type Signal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ProjectFacade } from '../../application/facades/project-facade';

@Component({
  selector: 'app-project-dashboard',
  imports: [MatProgressSpinner],
  templateUrl: './project-dashboard.html',
  styleUrl: './project-dashboard.scss',
})
export class ProjectDashboard {
  private projectFacade = inject(ProjectFacade);
  projectsState = computed(() => this.projectFacade.state());
}
