import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { Login } from './login/login';

export const AUTH_ROUTE_PARAMS = {
  role: 'role',
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
        pathMatch: 'full',
      },
      {
        path: AUTH_ROUTE_PARAMS.role,
        loadComponent: () => import('./sign-up/role/role').then((m) => m.Role),
      },
      {
        path: AUTH_ROUTE_PARAMS.signup,
        loadComponent: () => import('./sign-up/sign-up').then((m) => m.SignUp),
      },
    ],
  },
];
