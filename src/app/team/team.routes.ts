import { Routes } from '@angular/router';

export const TEAM_ROUTE_PARAMS = {
  createTeam: 'create-team',
  joinTeam: 'join-team',
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
  {
    path: TEAM_ROUTE_PARAMS.createTeam,
    loadComponent: () => import('./create-team/create-team').then((m) => m.CreateTeam),
  },
  {
    path: TEAM_ROUTE_PARAMS.joinTeam,
    loadComponent: () => import('./join-team/join-team').then((m) => m.JoinTeam),
  },
];
