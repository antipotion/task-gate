import { inject, Injectable } from '@angular/core';
import { map, shareReplay, type Observable } from 'rxjs';
import { InfrastructureService } from '../../infrastructure/infrastructure-service';
import type { Project } from '../../project/project.model';
import type { Task } from '../../project/task/task.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly infrastructureService = inject(InfrastructureService);

  projects$: Observable<Project[]> = this.infrastructureService
    .listenToProjectsCollection$()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  addProject(project: Omit<Project, 'id'>): Promise<string> {
    return this.infrastructureService.addProjectDocument(project);
  }

  addTask(task: Omit<Task, 'id'>): Promise<string> {
    return this.infrastructureService.addTaskDocument(task);
  }

  getProjectById$(projectId: string): Observable<Project | undefined> {
    return this.projects$.pipe(
      map((projects) => projects.find((project) => project.id === projectId)),
    );
  }

  updateProject(id: string, dto: Partial<Project>): Promise<void> {
    return this.infrastructureService.updateProject(id, dto);
  }
}
