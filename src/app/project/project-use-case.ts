import { inject, Injectable } from '@angular/core';
import { ProjectRepository } from '../application/repository/project-repository';
import type { Project } from './project.model';

@Injectable()
export class ProjectUseCase {
  private readonly _repo = inject(ProjectRepository);

  async addProject(project: Omit<Project, 'id'>): Promise<string> {
    return this._repo.addProject(project);
  }

  async updateProject(id: string, original: Project, dto: Partial<Project>): Promise<void> {
    const changes: Partial<Project> = diff(original, dto);

    // Guard if there are no changes
    if (Object.keys(changes).length === 0) return;

    return this._repo.updateProject(id, changes);
  }

  async deleteProject(id: string): Promise<void> {
    return this._repo.deleteProject(id);
  }
}

export function diff<T>(original: T, updated: Partial<T>): Partial<T> {
  const result: Partial<T> = {};

  for (const key in updated) {
    const typedKey = key as keyof T;

    if (updated[typedKey] !== original[typedKey]) {
      result[typedKey] = updated[typedKey];
    }
  }

  return result;
}
