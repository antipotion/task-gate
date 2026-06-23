import { Routes } from '@angular/router';
import { Team } from './team';

export const TEAM_ROUTE_PARAMS = {
  createTeam: 'create-team',
  joinTeam: 'join-team',
  teamId: 'teamId',
  teamDashboard: 'team-dashboard',
} as const;

const TEAM_ROUTE_HELPERS = {
  teamDetails: `${TEAM_ROUTE_PARAMS.teamDashboard}/:${TEAM_ROUTE_PARAMS.teamId}`,
} as const;

export const TeamRoutes: Routes = [
  {
    path: '',
    component: Team,
  },
  {
    path: TEAM_ROUTE_PARAMS.teamDashboard,
    loadComponent: () => import('./team-dashboard/team-dashboard').then((m) => m.TeamDashboard),
  },
  {
    path: TEAM_ROUTE_HELPERS.teamDetails,
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
