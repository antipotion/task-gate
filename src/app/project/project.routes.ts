import type { Routes } from '@angular/router';
import { ROUTES_PARAMS } from '../app.routes';
import { Project } from './project';
import { ProjectDashboard } from './project-dashboard/project-dashboard';
import { TASK_ROUTE_PARAMS } from './task/task.routes';

export const PROJECT_ROUTE_PARAMS = {
  projectId: 'projectId',
  create: 'create',
} as const;

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
        path: PROJECT_ROUTE_PARAMS.create,
        loadComponent: () => import('./create-project/create-project').then((m) => m.CreateProject),
      },
      {
        path: `:${PROJECT_ROUTE_PARAMS.projectId}`,
        loadComponent: () =>
          import('./project-dashboard/project-details/project-details').then(
            (m) => m.ProjectDetails,
          ),
      },
      {
        path: `:${PROJECT_ROUTE_PARAMS.projectId}/${ROUTES_PARAMS.task}/:${TASK_ROUTE_PARAMS.taskId}`,
        loadComponent: () => import('./task/task-details/task-details').then((m) => m.TaskDetails),
      },
    ],
  },
];
