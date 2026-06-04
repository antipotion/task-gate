import { Routes } from "@angular/router";
import { ReviewDetail } from "./review-detail/review-detail";

export const REVIEW_ROUTE_PARAMS = {
  reviewId: 'reviewId',
}

export const reviewRoutes: Routes = [
  {
    path: `:${REVIEW_ROUTE_PARAMS.reviewId}`,
    component: ReviewDetail,
  },
];
