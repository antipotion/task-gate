import { Component } from '@angular/core';
import { ProjectHeader } from './project-header/project-header';
import { ProjectMetrics } from './project-metrics/project-metrics';
import { ProjectOverview } from './project-overview/project-overview';
import { ProjectTasksBoard } from './project-tasks-board/project-tasks-board';
import { ProjectActivityFeed } from "./project-activity-feed/project-activity-feed";

@Component({
  selector: 'app-project-dashboard',
  imports: [ProjectHeader, ProjectOverview, ProjectMetrics, ProjectTasksBoard, ProjectActivityFeed],
  templateUrl: './project-dashboard.html',
  styleUrl: './project-dashboard.scss',
})
export class ProjectDashboard {}
