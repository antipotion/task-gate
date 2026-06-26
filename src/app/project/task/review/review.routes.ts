import { Routes } from '@angular/router';

export const REVIEW_ROUTE_PARAMS = {
  reviewId: 'reviewId',
  discussion: `discussion`,
};

const REVIEW_ROUTE_HELPERS = {
  discussion: `:${REVIEW_ROUTE_PARAMS.reviewId}/${REVIEW_ROUTE_PARAMS.discussion}`,
} as const;

export const reviewRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./review-detail-shell/review-detail-shell').then((m) => m.ReviewDetailShell),
  },
  {
    path: `:${REVIEW_ROUTE_PARAMS.reviewId}`,
    loadComponent: () =>
      import('./review-detail-shell/review-detail-shell').then((m) => m.ReviewDetailShell),
  },
  {
    path: REVIEW_ROUTE_HELPERS.discussion,
    loadComponent: () =>
      import('./review-detail-shell/review-detail-shell').then((m) => m.ReviewDetailShell),
  },
];
