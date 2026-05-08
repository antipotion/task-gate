import { Routes } from '@angular/router';
import { AuthRoutes } from './authentication/auth.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    children: AuthRoutes,
  },
  {
    path: 'project',
    loadChildren: () => import('./project/project.routes').then((m) => m.projectRoutes),
  },
  {
    path: 'task',
    loadChildren: () => import('./project/task/task.routes').then((m) => m.TaskRoutes),
  },
];
