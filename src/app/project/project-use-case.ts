import { inject, Injectable } from '@angular/core';
import { ProjectRepository } from '../application/repository/project-repository';
import type { Project } from './project.model';
import type { Task, TaskStatus } from './task/task.model';

@Injectable()
export class ProjectUseCase {
  private readonly repo = inject(ProjectRepository);

  async addProject(project: Omit<Project, 'id'>): Promise<string> {
    const projectId = await this.repo.addProject(project);

    return projectId;
  }

  async addTask(projectId: string, task: Omit<Task, 'id'>): Promise<string> {
    const status: TaskStatus = 'TODO';
    const withProjectIdTask = { ...task, projectId, status };

    const taskId = await this.repo.addTask(withProjectIdTask);

    return taskId;
  }

  async updateProject(id: string, original: Project, dto: Partial<Project>): Promise<void> {
    const changes: Partial<Project> = diff(original, dto);

    // Guard if there are no changes
    if (Object.keys(changes).length === 0) return;

    return await this.repo.updateProject(id, changes);
  }
}

function diff<T>(original: T, updated: Partial<T>): Partial<T> {
  const result: Partial<T> = {};

  for (const key in updated) {
    const typedKey = key as keyof T;

    if (updated[typedKey] !== original[typedKey]) {
      result[typedKey] = updated[typedKey];
    }
  }

  return result;
}
