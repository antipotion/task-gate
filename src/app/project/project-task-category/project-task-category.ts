import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ROUTES_PARAMS } from '../../app.routes';
import { ProjectFacade } from '../project-facade';
import { PROJECT_ROUTE_PARAMS } from '../project.routes';
import { Task } from '../task/task.model';

@Component({
  selector: 'app-project-task-category',
  imports: [TitleCasePipe, MatIconModule, NgClass, MatButtonModule],
  templateUrl: './project-task-category.html',
  styleUrl: './project-task-category.scss',
})
export class ProjectTaskCategory {
  private readonly _projectFacade = inject(ProjectFacade);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  private readonly _projectId = toSignal<string | null>(
    this._route.paramMap.pipe(map((params) => params.get(PROJECT_ROUTE_PARAMS.projectId))),
    { initialValue: null },
  );
  readonly category = toSignal<string | null>(
    this._route.paramMap.pipe(map((params) => params.get(PROJECT_ROUTE_PARAMS.taskCategory))),
  );

  private readonly _tasks = computed(() => this._projectFacade.tasks());

  readonly filteredTasks = signal<Task[] | null>(null);

  constructor() {
    effect(() => {
      const projectId = this._projectId();
      if (!projectId) return;

      this._projectFacade.setProjectIdForTask(projectId);

      const tasks = this._tasks();
      const category = this.category();
      const filteredTasks = tasks?.filter((task) => task.status === category);

      this.filteredTasks.set(filteredTasks ?? null);
    });
  }

  onSelectTask(taskId: string): void {
    this._router.navigate([ROUTES_PARAMS.task, taskId]);
  }

  onBack(): void {
    const projectId = this._projectId();
    if (!projectId) return;

    this._router.navigate([ROUTES_PARAMS.project, projectId]);
  }
}
