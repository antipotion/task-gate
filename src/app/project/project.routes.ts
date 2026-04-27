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
        path: ':id',
        loadComponent: () =>
          import('./project-dashboard/project-details/project-details').then(
            (m) => m.ProjectDetails,
          ),
      },
    ],
  },
];
