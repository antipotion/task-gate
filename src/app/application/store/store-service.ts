import { inject, Injectable, type OnDestroy } from '@angular/core';
import { map, shareReplay, type Observable, type Subscription } from 'rxjs';
import { InfrastructureService } from '../../infrastructure/infrastructure-service';
import type { Project } from '../../project/project.types';

@Injectable({
  providedIn: 'root',
})
export class StoreService implements OnDestroy {
  private readonly infrastructureService = inject(InfrastructureService);
  private projectsCollectionSubscription: Subscription | null = null;

  projects$: Observable<Project[]> = this.infrastructureService
    .listenToProjectsCollection$()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  async addProject(project: Omit<Project, 'id'>): Promise<string> {
    return this.infrastructureService.addProjectDocument(project);
  }

  getProjectById$(projectId: string): Observable<Project | undefined> {
    return this.projects$.pipe(
      map((projects) => projects.find((project) => project.id === projectId)),
    );
  }

  ngOnDestroy(): void {
    this.projectsCollectionSubscription?.unsubscribe();
    this.projectsCollectionSubscription = null;
  }
}
