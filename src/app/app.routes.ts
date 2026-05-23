import { Routes } from '@angular/router';

export const ROUTES_PARAMS = {
  auth: 'auth',
  project: 'project',
  task: 'task',
  teams: 'teams',
} as const;

export const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES_PARAMS.auth,
    pathMatch: 'full',
  },
  {
    path: ROUTES_PARAMS.auth,
    loadChildren: () => import('./authentication/auth.routes').then((m) => m.AuthRoutes),
  },
  {
    path: ROUTES_PARAMS.project,
    loadChildren: () => import('./project/project.routes').then((m) => m.projectRoutes),
  },
  {
    path: ROUTES_PARAMS.task,
    loadChildren: () => import('./project/task/task.routes').then((m) => m.TaskRoutes),
  },
  {
    path: ROUTES_PARAMS.teams,
    loadComponent: () =>
      import('./team/team-dashboard/team-dashboard').then((m) => m.TeamDashboard),
  },
];
