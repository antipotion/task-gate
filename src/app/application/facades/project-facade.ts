import { inject, Injectable } from '@angular/core';
import type { Project } from '../../project/project.types';
import { StoreService } from '../store/store-service';

@Injectable()
export class ProjectFacade {
  private storeService = inject(StoreService);

  activeProject: Project | null = null;

  async addProject(project: Omit<Project, 'id'>): Promise<string> {
    try {
      const projectId = await this.storeService.addProject(project);

      this.activeProject = { id: projectId, ...project };
      return projectId;
    } catch (error) {
      // TODO: Handle error appropriately, e.g., show a notification to the user
      console.error('Error adding project:', error);
      throw new Error(`Error adding project: ${String(error)}`);
    }
  }

  getProjects(): Project[] {
    return this.storeService.getProjects();
  }
}
