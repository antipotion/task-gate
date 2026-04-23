import type { Routes } from '@angular/router';
import { CreateProject } from './create-project/create-project';
import { Project } from './project';

export const projectRoutes: Routes = [
  {
    path: '',
    component: Project,
    children: [
      {
        path: '',
        component: CreateProject,
      },
      {
        path: 'project-dashboard',
        loadComponent: () =>
          import('./project-dashboard/project-dashboard').then((m) => m.ProjectDashboard),
      },
    ],
  },
];
