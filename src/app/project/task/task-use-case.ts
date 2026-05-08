import { inject, Injectable } from '@angular/core';
import { FirestoreProjectRepository } from '../../infrastructure/firestore/firestore-project-repository';
import type { Task, TaskAction, TaskStatus } from './task.model';
import { diff } from '../project-use-case';

@Injectable({
  providedIn: 'root',
})
export class TaskUseCase {
  private repo = inject(FirestoreProjectRepository);

  async addTask(projectId: string, task: Omit<Task, 'id'>): Promise<string> {
    const status: TaskStatus = 'TODO';
    const action: TaskAction = 'START';
    const currentSubmissionVersion: number = 1;
    const withProjectIdTask = { ...task, projectId, status, action, currentSubmissionVersion };

    const taskId = await this.repo.addTask(withProjectIdTask);

    return taskId;
  }

  async updateTask(taskId: string, original: Task, dto: Partial<Task>): Promise<void> {
    const changes: Partial<Task> = diff(original, dto);

    // Guard if there are no changes
    if (Object.keys(changes).length === 0) return;

    return await this.repo.updateTask(taskId, changes);
  }

  deleteTask(taskId: string): Promise<void> {
    return this.repo.deleteTask(taskId);
  }
}
