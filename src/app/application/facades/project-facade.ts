import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { type Subscription } from 'rxjs';
import type { Project } from '../../project/project.types';
import { StoreService } from '../store/store-service';

type ProjectState =
  | { status: 'loading' }
  | { status: 'success'; data: Project[] }
  | { status: 'error'; error: string };

@Injectable()
export class ProjectFacade {
  private storeService = inject(StoreService);
  private destroyRef = inject(DestroyRef);
  private readonly _projectState = signal<ProjectState>({ status: 'loading' });

  readonly state = this._projectState.asReadonly();
  readonly activeProject = signal<Project | null>(null);

  constructor() {
    const projectSubscription = this.loadProjects();

    this.destroyRef.onDestroy(() => {
      projectSubscription.unsubscribe();
    });
  }

  loadProjects(): Subscription {
    this._projectState.set({ status: 'loading' });

    const subscription = this.storeService.projects$.subscribe({
      next: (projects) => {
        this._projectState.set({ status: 'success', data: projects });
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this._projectState.set({ status: 'error', error: String(error) });
      },
    });

    return subscription;
  }

  async addProject(project: Omit<Project, 'id'>): Promise<string> {
    try {
      const projectId = await this.storeService.addProject(project);

      return projectId;
    } catch (error) {
      // TODO: Handle error appropriately, e.g., show a notification to the user
      console.error('Error adding project:', error);
      throw new Error(`Error adding project: ${String(error)}`);
    }
  }

  getActiveProject(projectId: string): void {
    this.storeService.getProjectById$(projectId).subscribe((project) => {
      if (project) {
        this.activeProject.set(project);
      } else {
        console.warn(`Project with ID ${projectId} not found.`);
        this.activeProject.set(null);
      }
    });
  }
}
