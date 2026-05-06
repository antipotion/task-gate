import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { TaskSort } from '../../task/task-sort/task-sort';

@Component({
  selector: 'app-project-tasks-board',
  imports: [MatIconModule, TaskSort],
  templateUrl: './project-tasks-board.html',
  styleUrl: './project-tasks-board.scss',
})
export class ProjectTasksBoard {
  private route = inject(ActivatedRoute);

  readonly projectId = this.route.snapshot.paramMap.get('projectId') || '';
}
