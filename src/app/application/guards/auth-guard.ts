import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Auth } from 'firebase/auth';
import { auth } from '../../../environment/firebase.config';
import { ROUTES_PARAMS } from '../../app.routes';

export const authGuard: CanMatchFn = async () => {
  const authSource: Auth = auth;
  const router = inject(Router);

  await authSource.authStateReady();

  if (authSource.currentUser) {
    return true;
  }

  return router.createUrlTree([ROUTES_PARAMS.auth]);
};
