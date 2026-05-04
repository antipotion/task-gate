import type { Routes } from '@angular/router';
import { Project } from './project';
import { ProjectDashboard } from './project-dashboard/project-dashboard';

export const projectRoutes: Routes = [
  {
    path: '',
    component: Project,
    children: [
      {
        path: '',
        component: ProjectDashboard,
      },
      {
        path: 'create',
        loadComponent: () => import('./create-project/create-project').then((m) => m.CreateProject),
      },
      {
        path: ':projectId/task',
        loadChildren: () => import('./task/task.routes').then((m) => m.TaskRoutes),
      },
      {
        path: ':projectId',
        loadComponent: () =>
          import('./project-dashboard/project-details/project-details').then(
            (m) => m.ProjectDetails,
          ),
      },
    ],
  },
];
