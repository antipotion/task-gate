import { inject, Injectable } from '@angular/core';
import { AuthStore } from '../authentication/auth-store';
import { FirestoreProjectRepository } from '../infrastructure/firestore/firestore-project-repository';
import type { Project } from './project.model';

@Injectable()
export class ProjectUseCase {
  private readonly _repo = inject(FirestoreProjectRepository);
  private readonly _authStore = inject(AuthStore);

  async addProject(project: Omit<Project, 'id' | 'userId'>): Promise<string> {
    const userId = this._authStore.userId();

    if (!userId) {
      throw new Error('User id does not exist');
    }

    const projectWithUserId: Omit<Project, 'id'> = {
      ...project,
      userId,
    };
    return this._repo.addProject(projectWithUserId);
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
