import type { Routes } from '@angular/router';

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
    children: [
      {
        path: '',
        loadComponent: () => import('../project-shell/project-shell').then((m) => m.ProjectShell),
      },
      {
        path: `:${PROJECT_ROUTE_PARAMS.projectId}`,
        loadComponent: () =>
          import('../project-detail-shell/project-detail-shell').then((m) => m.ProjectDetailShell),
      },
      {
        path: PROJECT_ROUTE_HELPERS.taskCategory,
        loadComponent: () =>
          import('../project-detail-shell/project-detail-shell').then((m) => m.ProjectDetailShell),
      },
    ],
  },
];
