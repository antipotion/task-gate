import { inject, Injectable } from '@angular/core';
import { map, shareReplay, type Observable } from 'rxjs';
import type { Project } from '../../project/project.model';
import { ProjectRepository } from '../repository/project-repository';
import { Task } from '../../project/task/task.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly repo = inject(ProjectRepository);

  projects$: Observable<Project[]> = this.repo
    .listenToProjects$()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  getProjectById$(projectId: string): Observable<Project | undefined> {
    return this.projects$.pipe(
      map((projects) => projects.find((project) => project.id === projectId)),
    );
  }

  tasks$: Observable<Task[]> = this.repo
    .listenToTasks$()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  getTaskById$(taskId: string): Observable<Task | undefined> {
    return this.tasks$.pipe(map((tasks) => tasks.find((task) => task.id === taskId)));
  }
}
