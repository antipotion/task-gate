import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_PARAMS } from '../../../../app.routes';
import { UserModel } from '../../../../authentication/auth.model';
import { Comment } from '../../../review/comment/comment';
import { ReviewResource } from '../../../review/review-resource/review-resource';
import { TaskActionModel } from '../../task.model';
import { TASK_ROUTE_PARAMS } from '../../task.routes';
import { ReviewFacade } from '../review-facade/review-facade';
import { ReviewHero } from '../review-hero/review-hero';
import { REVIEW_ROUTE_PARAMS } from '../review.routes';

@Component({
  selector: 'app-review-detail',
  imports: [ReviewHero, ReviewResource, Comment, MatButtonModule],
  templateUrl: './review-detail.html',
  styleUrl: './review-detail.scss',
})
export class ReviewDetail implements OnInit {
  private readonly _reviewFacade = inject(ReviewFacade);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  private readonly _taskId = this._route.snapshot.paramMap.get(TASK_ROUTE_PARAMS.taskId);
  private readonly _reviewId = this._route.snapshot.paramMap.get(REVIEW_ROUTE_PARAMS.reviewId);

  readonly currentReviewData = this._reviewFacade.getCurrentReview(this._reviewId, this._taskId);
  readonly submittedBy = signal<string | null>(null);
  readonly reviewer = signal<string | null>(null);

  constructor() {
    // SubmittedByData
    effect(async () => {
      const submittedById = this.currentReviewData()?.submittedById;
      if (!submittedById) {
        return;
      }

      const submittedByData = await this._reviewFacade.getUserById(submittedById);
      if (!submittedByData) return;

      const submittedBy = `${submittedByData.firstName} ${submittedByData.lastName}`;
      this.submittedBy.set(submittedBy);
    });

    // ReviewerData
    effect(async () => {
      const reviewerId = this.currentReviewData()?.reviewerId;
      if (!reviewerId) {
        return;
      }

      const reviewerData = await this._reviewFacade.getUserById(reviewerId);
      if (!reviewerData) return;

      const reviewer = `${reviewerData.firstName} ${reviewerData.lastName}`;
      this.reviewer.set(reviewer);
    });
  }

  ngOnInit(): void {
    const taskId = this._taskId;
    if (!taskId) return;

    this._reviewFacade.selectTaskId(taskId);
  }

  getUserById(userId: string | undefined): Promise<UserModel | null> {
    if (!userId) return Promise.resolve(null);

    return this._reviewFacade.getUserById(userId);
  }

  onBack(): void {
    const taskid = this.currentReviewData()?.taskId;
    if (!taskid) return;

    this._router.navigate([ROUTES_PARAMS.task, taskid]);
  }

  async onJudgement(action: Extract<TaskActionModel, 'APPROVE' | 'REJECT'>): Promise<void> {
    const taskId = this._taskId;
    const reviewId = this._reviewId;
    if (!taskId || !reviewId) {
      throw new Error('taskId or reviewId is missing cannot process review judgement');
    }

    await this._reviewFacade.closeReview(reviewId, action);

    this._reviewFacade.advanceTaskState(action);
    this._router.navigate([ROUTES_PARAMS.task, taskId]);
  }
}
