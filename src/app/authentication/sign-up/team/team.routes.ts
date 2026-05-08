import { Routes } from "@angular/router";
import { Team } from "./team";

export const TeamRoutes: Routes = [
  {
    path: '',
    component: Team,
  },
  {
    path: 'create-team',
    loadComponent: () => import('./create-team/create-team').then((m) => m.CreateTeam),
  },
  {
    path: 'join-team',
    loadComponent: () => import('./join-team/join-team').then((m) => m.JoinTeam),
  },
];
