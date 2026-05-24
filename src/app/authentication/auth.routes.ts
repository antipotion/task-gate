import { Routes } from "@angular/router";
import { Login } from "./login/login";
import { Auth } from "./auth/auth";

export const AUTH_ROUTE_PARAMS = {
  role: 'role',
  team: 'team',
  signup: 'signup',
} as const;

export const AuthRoutes: Routes = [
  {
    path: '',
    component: Auth,
    children: [
      {
        path: '',
        component: Login,
      },
      {
        path: AUTH_ROUTE_PARAMS.role,
        loadComponent: () => import('./sign-up/role/role').then((m) => m.Role),
      },
      {
        path: AUTH_ROUTE_PARAMS.team,
        loadChildren: () => import('../team/team.routes').then((m) => m.TeamRoutes),
      },
      {
        path: AUTH_ROUTE_PARAMS.signup,
        loadComponent: () => import('./sign-up/sign-up').then((m) => m.SignUp),
      }
    ]
  },
]