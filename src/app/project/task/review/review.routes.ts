import { Routes } from '@angular/router';

export const REVIEW_ROUTE_PARAMS = {
  review: 'review',
  reviewId: 'reviewId',
};

export const reviewRoutes: Routes = [
  {
    path: `:${REVIEW_ROUTE_PARAMS.reviewId}`,
    loadComponent: () => import('./review-detail/review-detail').then((m) => m.ReviewDetail),
  },
];
