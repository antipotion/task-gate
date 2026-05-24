import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith } from 'rxjs';
import { StoreService } from '../application/store/store-service';
import { ProjectUseCase } from './project-use-case';
import type { Project } from './project.model';

export type ProjectState =
  | { status: 'loading' }
  | { status: 'success'; data: Project[] }
  | { status: 'error'; error: string };

@Injectable()
export class ProjectFacade {
  private readonly _storeService = inject(StoreService);
  private readonly _projectUseCase = inject(ProjectUseCase);

  readonly projectState = toSignal(
    this._storeService.projects$.pipe(
      map(
        (projects): ProjectState => ({
          status: 'success',
          data: projects,
        }),
      ),
      startWith({ status: 'loading' } as ProjectState),
      catchError((error) => of({ status: 'error', error: String(error) } as ProjectState)),
    ),
    { initialValue: { status: 'loading' } },
  );

  private readonly selectedProjectId = signal<string | null>(null);

  readonly activeProject = computed<Project | null>(() => {
    const state = this.projectState();
    const id = this.selectedProjectId();

    if (state.status !== 'success' || !id) return null;

    return state.data.find((p) => p.id === id) ?? null;
  });

  addProject(project: Omit<Project, 'id' | 'creatorId'>): Promise<string> {
    return this._projectUseCase.addProject(project);
  }

  selectProject(projectId: string): void {
    this.selectedProjectId.set(projectId);
  }

  async updateProject(id: string, dto: Partial<Project>): Promise<void> {
    const state = this.projectState();

    if (state.status !== 'success') return;

    const project = state.data.find((project) => project.id === id);
    if (!project) {
      console.error('Project not found');
      return;
    }

    return await this._projectUseCase.updateProject(id, project, dto);
  }

  deleteProject(id: string): Promise<void> {
    return this._projectUseCase.deleteProject(id);
  }
}
