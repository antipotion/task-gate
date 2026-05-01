import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectFacade } from '../../project-facade';
import type { Project } from '../../project.types';
import { ProjectActivityFeed } from '../project-activity-feed/project-activity-feed';
import { ProjectHeader } from '../project-header/project-header';
import { ProjectMetrics } from '../project-metrics/project-metrics';
import { ProjectOverview } from '../project-overview/project-overview';
import { ProjectTasksBoard } from '../project-tasks-board/project-tasks-board';
import { EditProjectDialog } from './edit-project-dialog/edit-project-dialog';

@Component({
  selector: 'app-project-details',
  imports: [
    ProjectHeader,
    ProjectOverview,
    ProjectMetrics,
    ProjectTasksBoard,
    ProjectActivityFeed,
    MatButtonModule,
    MatIconModule,
    DatePipe,
  ],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
})
export class ProjectDetails {
  private projectFacade = inject(ProjectFacade);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);

  private projectId = this.route.snapshot.paramMap.get('id') || '';

  project = computed<Project | null>(() => this.projectFacade.activeProject());

  onBack(): void {
    this.router.navigate([''], { relativeTo: this.route.parent });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditProjectDialog, {
      data: { name: this.project()?.name, deadline: this.project()?.deadline },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.projectFacade.updateProject(this.projectId, result);
    });
  }

  ngOnInit(): void {
    this.projectFacade.getActiveProject(this.projectId);
  }
}
