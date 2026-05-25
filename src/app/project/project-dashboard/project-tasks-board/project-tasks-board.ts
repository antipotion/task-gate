import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { TaskSort } from '../../task/task-sort/task-sort';
import { PROJECT_ROUTE_PARAMS } from '../../project.routes';

@Component({
  selector: 'app-project-tasks-board',
  imports: [MatIconModule, TaskSort],
  templateUrl: './project-tasks-board.html',
  styleUrl: './project-tasks-board.scss',
})
export class ProjectTasksBoard {
  private readonly _route = inject(ActivatedRoute);

  readonly projectId = this._route.snapshot.paramMap.get(PROJECT_ROUTE_PARAMS.projectId) || '';
}
