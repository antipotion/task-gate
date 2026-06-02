import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { auth } from '../../../environment/firebase.config';
import { ROUTES_PARAMS } from '../../app.routes';

export const guestGuard: CanMatchFn = async () => {
  const authSource = auth;
  const router = inject(Router);

  await authSource.authStateReady();

  if (authSource.currentUser) {
    return router.createUrlTree([ROUTES_PARAMS.project]);
  }

  return true;
};
