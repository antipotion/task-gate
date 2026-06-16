import { Component, effect, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { StoreService } from '../../../application/store/store-service';
import { PROJECT_ROUTE_PARAMS } from '../../project.routes';
import { TaskStatus } from '../../task/task.model';
import { ProjectTaskBoardCard } from '../project-task-board-card/project-task-board-card';

@Component({
  selector: 'app-project-tasks-board',
  imports: [ProjectTaskBoardCard],
  templateUrl: './project-tasks-board.html',
  styleUrl: './project-tasks-board.scss',
})
export class ProjectTasksBoard {
  private readonly _route = inject(ActivatedRoute);
  private readonly _storeService = inject(StoreService);

  readonly taskCategories: TaskStatus[] = [
    'TODO',
    'IN-PROGRESS',
    'REVIEWING',
    'REJECTED',
    'APPROVED',
  ];

  readonly projectId: Signal<string | null> = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(PROJECT_ROUTE_PARAMS.projectId))),
    { initialValue: null },
  );

  constructor() {
    effect(() => {
      const projectId = this.projectId();
      if (!projectId) return;

      this._storeService.setProjectId(projectId);
    });
  }
}
