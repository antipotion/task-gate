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
        path: 'project-dashboard/:id',
        loadComponent: () =>
          import('./project-dashboard/project-dashboard').then((m) => m.ProjectDashboard),
      },
    ],
  },
];
