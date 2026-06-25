import { inject, Injectable } from '@angular/core';
import { AuthStore } from '../../authentication/auth-store';
import { FirestoreProjectRepository } from '../../infrastructure/firestore/firestore-project-repository';
import { diff } from '../project-usecase/project-use-case';
import type { Task, TaskActionModel, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskUseCase {
  private readonly _repo = inject(FirestoreProjectRepository);
  private readonly _authStore = inject(AuthStore);

  async addTask(projectId: string, task: Omit<Task, 'id'>): Promise<string> {
    const status: TaskStatus = 'TODO';
    const action: TaskActionModel = 'START';

    const creatorId: string | null = this._authStore.userId();
    if (!creatorId) {
      throw new Error("Can't create task creatorId is missing.");
    }

    const currentSubmissionVersion: number = 1;
    const withProjectIdTask = {
      ...task,
      projectId,
      status,
      action,
      creatorId,
      currentSubmissionVersion,
    };

    const taskId = await this._repo.addTask(withProjectIdTask);

    return taskId;
  }

  async updateTask(taskId: string, original: Task, dto: Partial<Task>): Promise<void> {
    const changes: Partial<Task> = diff(original, dto);

    // Guard if there are no changes
    if (Object.keys(changes).length === 0) return;

    return this._repo.updateTask(taskId, changes);
  }

  async deleteTask(taskId: string): Promise<void> {
    return this._repo.deleteTask(taskId);
  }
}
