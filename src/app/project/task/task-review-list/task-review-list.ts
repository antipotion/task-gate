import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewModel } from '../review/review.model';
import { REVIEW_ROUTE_PARAMS } from '../review/review.routes';

@Component({
  selector: 'app-task-review-list',
  imports: [MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './task-review-list.html',
  styleUrl: './task-review-list.scss',
})
export class TaskReviewList {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  readonly reviewList = input.required<ReviewModel[] | null>();

  onViewReview(reviewId: string): void {
    this._router.navigate([REVIEW_ROUTE_PARAMS.review, reviewId], { relativeTo: this._route });
  }
}
