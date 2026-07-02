import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ROUTES_PARAMS } from '../../../../app.routes';
import { UserModel } from '../../../../authentication/auth-model/auth.model';
import { NotificationDTOModel } from '../../../../notification/notification.model';
import { TaskActionModel } from '../../task.model';
import { ReviewFacade } from '../review-facade/review-facade';
import { ReviewHero } from '../review-hero/review-hero';
import { ReviewResource } from '../review-resource/review-resource';
import { REVIEW_ROUTE_PARAMS } from '../review.routes';

@Component({
  selector: 'app-review-detail',
  imports: [ReviewHero, ReviewResource, MatButtonModule, MatIconModule],
  templateUrl: './review-detail.html',
  styleUrl: './review-detail.scss',
})
export class ReviewDetail {
  private readonly _reviewFacade = inject(ReviewFacade);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _snackbar = inject(MatSnackBar);

  private readonly _reviewId = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(REVIEW_ROUTE_PARAMS.reviewId))),
  );

  readonly isMobile = input<boolean>(false);
  readonly currentReviewData = computed(() => this._reviewFacade.review());
  readonly submittedBy = signal<string | null>(null);
  readonly reviewer = signal<string | null>(null);
  readonly taskId = computed(() => this.currentReviewData()?.taskId);

  constructor() {
    // CurrentReviewData
    effect(() => {
      const reviewId = this._reviewId();
      if (!reviewId) return;

      this._reviewFacade.setReviewid(reviewId);
    });

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

    effect(() => {
      const taskId = this.taskId();
      if (!taskId) return;

      this._reviewFacade.selectTaskId(taskId);
    });
  }

  getUserById(userId: string | undefined): Promise<UserModel | null> {
    if (!userId) return Promise.resolve(null);

    return this._reviewFacade.getUserById(userId);
  }

  onBack(): void {
    const taskid = this.currentReviewData()?.taskId;
    if (!taskid) {
      throw new Error('taskId is not present');
    }

    this._router.navigate([ROUTES_PARAMS.task, taskid]);
  }

  async onJudgement(action: Extract<TaskActionModel, 'APPROVE' | 'REJECT'>): Promise<void> {
    const currentReview = this.currentReviewData();
    if (!currentReview) return;

    const taskId = currentReview.taskId;
    const reviewId = this._reviewId();
    if (!taskId || !reviewId) {
      throw new Error('taskId or reviewId is missing cannot process review judgement');
    }

    try {
      const receiverId = currentReview.submittedById;
      if (!receiverId) {
        throw new Error('receiverId not present');
      }

      const senderId = this._reviewFacade.userId();
      if (!senderId) {
        throw new Error('senderId not present');
      }

      await this._reviewFacade
        .closeReview(reviewId, action)
        .catch((error) => console.error('CLOSE REVIEW ERROR', error));
      
      this._reviewFacade.advanceTaskState(action);
      this._router.navigate([ROUTES_PARAMS.task, taskId]);

      const judgement = action === 'APPROVE' ? 'approved' : 'rejected';

      const notificationPayload: Omit<NotificationDTOModel, 'createdAt'> = {
        shortDescription: `A review has been ${judgement}.`,
        resourceUrl: `${ROUTES_PARAMS.review}/${reviewId}`,
        resourceType: 'review',
        receiverId,
        senderId,
        isRead: false,
      };

      await this._reviewFacade
        .addNotification(notificationPayload)
        .catch((error) => console.error('REVIEW JUDGEMENT NOTIFICATION ERROR', error));
    } catch (error) {
      console.error('REVIEW JUDGEMENT ERROR', error);

      const snacbarRef = this._snackbar.open(
        'An error occured while submitting judgement',
        'Dismiss',
        {
          duration: 3000,
          panelClass: 'mat-error-state',
        },
      );
      snacbarRef.onAction().subscribe(() => snacbarRef.dismiss());
    }
  }

  onShowDiscussion(): void {
    this._router.navigate([REVIEW_ROUTE_PARAMS.discussion], { relativeTo: this._route });
  }
}
