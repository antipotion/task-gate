import { Routes } from '@angular/router';
import { authGuard } from './application/guards/auth-guard';
import { guestGuard } from './application/guards/guest-guard';

export const ROUTES_PARAMS = {
  auth: 'auth',
  project: 'project',
  task: 'task',
  teams: 'teams',
  review: 'review',
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
    canMatch: [guestGuard],
  },
  {
    path: ROUTES_PARAMS.project,
    loadChildren: () => import('./project/project.routes').then((m) => m.projectRoutes),
    canMatch: [authGuard],
  },
  {
    path: ROUTES_PARAMS.task,
    loadChildren: () => import('./project/task/task.routes').then((m) => m.TaskRoutes),
    canMatch: [authGuard],
  },
  {
    path: ROUTES_PARAMS.teams,
    loadChildren: () => import('./team/team.routes').then((m) => m.TeamRoutes),
    canMatch: [authGuard],
  },
  {
    path: ROUTES_PARAMS.review,
    loadChildren: () => import('./project/task/review/review.routes').then((m) => m.reviewRoutes),
    canMatch: [authGuard],
  },
];
