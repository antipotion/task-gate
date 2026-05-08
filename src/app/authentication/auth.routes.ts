import { Routes } from "@angular/router";
import { Login } from "./login/login";
import { Auth } from "./auth/auth";

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
        path: 'role',
        loadComponent: () => import('./sign-up/role/role').then((m) => m.Role),
      },
      {
        path: 'team',
        loadChildren: () => import('./sign-up/team/team.routes').then((m) => m.TeamRoutes),
      },
      {
        path: 'sign-up',
        loadComponent: () => import('./sign-up/sign-up').then((m) => m.SignUp),
      }
    ]
  },
]