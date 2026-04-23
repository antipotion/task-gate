import { inject, Injectable, type OnDestroy } from '@angular/core';
import type { Subscription } from 'rxjs';
import { InfrastructureService } from '../../infrastructure/infrastructure-service';
import type { Project } from '../../project/project.types';

@Injectable({
  providedIn: 'root',
})
export class StoreService implements OnDestroy {
  private readonly infrastructureService = inject(InfrastructureService);
  private projectsCollectionSubscription: Subscription | null = null;

  projects: Project[] = [];

  constructor() {
    this.listenToProjectsCollection();
  }

  async addProject(project: Omit<Project, 'id'>): Promise<string> {
    return this.infrastructureService.addProjectDocument(project);
  }

  private listenToProjectsCollection(): void {
    this.projectsCollectionSubscription?.unsubscribe();

    this.projectsCollectionSubscription = this.infrastructureService
      .listenToProjectsCollection$()
      .subscribe({
        next: (projects) => {
          this.projects = projects;
        },
        error: (error) => {
          console.error('Error listening to projects collection', error);
        },
      });
  }

  getProjects(): Project[] {
    return this.projects;
  }

  ngOnDestroy(): void {
    this.projectsCollectionSubscription?.unsubscribe();
    this.projectsCollectionSubscription = null;
  }
}
