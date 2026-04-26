import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectFacade } from '../../../application/facades/project-facade';
import type { Project } from '../../project.types';
import { ProjectActivityFeed } from '../project-activity-feed/project-activity-feed';
import { ProjectHeader } from '../project-header/project-header';
import { ProjectMetrics } from '../project-metrics/project-metrics';
import { ProjectOverview } from '../project-overview/project-overview';
import { ProjectTasksBoard } from '../project-tasks-board/project-tasks-board';

@Component({
  selector: 'app-project-details',
  imports: [ProjectHeader, ProjectOverview, ProjectMetrics, ProjectTasksBoard, ProjectActivityFeed],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
})
export class ProjectDetails {
  private projectFacade = inject(ProjectFacade);
  private route = inject(ActivatedRoute);

  private projectId = this.route.snapshot.paramMap.get('id') || '';

  project = computed<Project | null>(() => this.projectFacade.activeProject());

  ngOnInit(): void {
    this.projectFacade.getActiveProject(this.projectId);
  }
}
