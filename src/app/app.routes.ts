import { Routes } from '@angular/router';
import { AuthRoutes } from './authentication/auth.routes';

export const ROUTES_PARAMS = {
  auth: 'auth',
  project: 'project',
  task: 'task',
} as const;

export const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES_PARAMS.auth,
    pathMatch: 'full',
  },
  {
    path: ROUTES_PARAMS.auth,
    children: AuthRoutes,
  },
  {
    path: ROUTES_PARAMS.project,
    loadChildren: () => import('./project/project.routes').then((m) => m.projectRoutes),
  },
  {
    path: ROUTES_PARAMS.task,
    loadChildren: () => import('./project/task/task.routes').then((m) => m.TaskRoutes),
  },
];
