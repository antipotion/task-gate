import type { Routes } from '@angular/router';
import { ProjectShell } from '../project-shell/project-shell';

export const PROJECT_ROUTE_PARAMS = {
  projectId: 'projectId',
  create: 'create',
  taskCategory: ':taskCategory',
} as const;

const PROJECT_ROUTE_HELPERS = {
  taskCategory: `:${PROJECT_ROUTE_PARAMS.projectId}/:${PROJECT_ROUTE_PARAMS.taskCategory}`,
} as const;

export const projectRoutes: Routes = [
  {
    path: '',
    component: ProjectShell,
    children: [
      {
        path: '',
        loadComponent: () => import('../project-shell/project-shell').then((m) => m.ProjectShell),
      },
      {
        path: `:${PROJECT_ROUTE_PARAMS.projectId}`,
        loadComponent: () => import('../project-shell/project-shell').then((m) => m.ProjectShell),
      },
      {
        path: PROJECT_ROUTE_HELPERS.taskCategory,
        loadComponent: () =>
          import('../project-task-category/project-task-category').then(
            (m) => m.ProjectTaskCategory,
          ),
      },
    ],
  },
];
