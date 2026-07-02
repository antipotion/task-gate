import { Routes } from '@angular/router';

export const TEAM_ROUTE_PARAMS = {
  teamId: 'teamId',
} as const;

export const TeamRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./team-shell/team-shell').then((m) => m.TeamShell),
  },
  {
    path: `:${TEAM_ROUTE_PARAMS.teamId}`,
    loadComponent: () => import('./team-shell/team-shell').then((m) => m.TeamShell),
  },
];
