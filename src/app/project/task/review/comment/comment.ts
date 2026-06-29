import { DatePipe } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ROUTES_PARAMS } from '../../../../app.routes';
import { NotificationDTOModel } from '../../../../notification/notification.model';
import { REVIEW_ROUTE_PARAMS } from '../review.routes';
import { CommentFacade } from './comment-facade';

@Component({
  selector: 'app-comment',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    DatePipe,
  ],
  templateUrl: './comment.html',
  styleUrl: './comment.scss',
})
export class Comment {
  private readonly _commentFacade = inject(CommentFacade);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _snackbar = inject(MatSnackBar);

  private readonly _reviewId = toSignal<string | null>(
    this._route.paramMap.pipe(map((params) => params.get(REVIEW_ROUTE_PARAMS.reviewId))),
    { initialValue: null },
  );

  private readonly reviewData = computed(() => this._commentFacade.reviewData());

  readonly isMobile = input<boolean>(false);
  readonly userId = computed(() => this._commentFacade.userId());
  readonly closedDate = computed(() => this.reviewData()?.closedDate);
  readonly commentAuthors = signal<Map<string, string>>(new Map());
  readonly comments = computed(() => this._commentFacade.comments());

  commentForm = new FormGroup({
    commentContent: new FormControl<string>('', Validators.required),
  });

  readonly commentControl = this.commentForm.controls.commentContent;

  constructor() {
    // Get comments
    effect(() => {
      const reviewId = this._reviewId();
      if (!reviewId) return;

      this._commentFacade.setReviewId(reviewId);
    });

    // Get authors' fullname
    effect(async () => {
      const comments = this.comments();
      if (!comments) return;

      for (const comment of comments) {
        if (this.commentAuthors().has(comment.authorId)) {
          continue;
        }

        const fullname = await this.getUserById(comment.authorId);
        if (!fullname) continue;

        this.commentAuthors.update((authors) => {
          const data = new Map(authors);
          data.set(comment.authorId, fullname);

          return data;
        });
      }
    });
  }

  async addComment(): Promise<void> {
    const taskId = this.reviewData()?.taskId;
    const reviewId = this._reviewId();
    if (!taskId || !reviewId) return;

    const content = this.commentControl.value;
    if (!content) return;

    try {
      const senderId = this.userId();
      if (!senderId) {
        throw new Error('senderId not present');
      }
      const receiverId = this.reviewData()?.reviewerId;
      if (!receiverId) {
        throw new Error('receiverId not prsent');
      }
      const commentId = await this._commentFacade.addComment(reviewId, taskId, content);
      if (!commentId) {
        throw new Error('Add comment failed');
      }

      const notificationPayload: Omit<NotificationDTOModel, 'createdAt'> = {
        shortDescription: 'A new comment is now available.',
        resourceUrl: `${ROUTES_PARAMS.review}/${reviewId}/${REVIEW_ROUTE_PARAMS.discussion}`,
        resourceType: 'discussion',
        receiverId,
        senderId,
        isRead: false,
      };

      await this._commentFacade
        .addNotification(notificationPayload)
        .catch((error) => console.error('ADD COMMENT NOTIFICATION ERROR', error));
    } catch (error) {
      console.error('SEND COMMENT ERROR', error);

      const snacbarRef = this._snackbar.open('Failed to add comment', 'Dismiss', {
        duration: 3000,
        panelClass: 'mat-error-state',
      });

      snacbarRef.onAction().subscribe(() => snacbarRef.dismiss());
    } finally {
      this.commentForm.reset();
    }
  }

  async getUserById(userId: string): Promise<string | null> {
    const result = await this._commentFacade.getUserById(userId);
    if (!result) return null;

    return `${result.firstName} ${result.lastName}`;
  }

  onBack(): void {
    const reviewId = this._reviewId();
    if (!reviewId) return;

    this._router.navigate([ROUTES_PARAMS.review, reviewId]);
  }
}
