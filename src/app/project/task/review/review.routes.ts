import { Routes } from '@angular/router';

export const REVIEW_ROUTE_PARAMS = {
  reviewId: 'reviewId',
};

export const reviewRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../task-review-list/task-review-list').then((m) => m.TaskReviewList),
  },
  {
    path: `:${REVIEW_ROUTE_PARAMS.reviewId}`,
    loadComponent: () => import('./review-detail/review-detail').then((m) => m.ReviewDetail),
  },
];
