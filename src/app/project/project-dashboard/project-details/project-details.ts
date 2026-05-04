import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectFacade } from '../../project-facade';
import type { Project } from '../../project.model';
import { CreateTask } from '../../task/create-task/create-task';
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

  ngOnInit(): void {
    this.projectFacade.selectProject(this.projectId);
  }

  onBack(): void {
    this.router.navigate([''], { relativeTo: this.route.parent });
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditProjectDialog, {
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      // TODO: Handle the result of the operation (e.g. Success | Error)
      this.projectFacade.updateProject(this.projectId, result);
    });
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(CreateTask, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      // TODO: Handle the result of the operation (e.g. Success | Error)
      this.projectFacade.addTask(this.projectId, result);
    });
  }
}
