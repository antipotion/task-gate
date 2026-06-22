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
      import('../task-review-list/task-review-list').then((m) => m.TaskReviewList),
  },
  {
    path: `:${REVIEW_ROUTE_PARAMS.reviewId}`,
    loadComponent: () => import('./review-detail/review-detail').then((m) => m.ReviewDetail),
  },
  {
    path: REVIEW_ROUTE_HELPERS.discussion,
    loadComponent: () => import('./comment/comment').then((m) => m.Comment),
  },
];
