import { TitleCasePipe } from '@angular/common';
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ROUTES_PARAMS } from '../../../app.routes';
import { NotificationDTOModel } from '../../../notification/notification.model';
import { ReviewModel } from '../review/review.model';
import { TaskFacade } from '../task-facade';
import { TaskActionModel, type TaskStatus as TaskStatusModel } from '../task.model';

@Component({
  selector: 'app-task-action',
  imports: [
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    TitleCasePipe,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-action.html',
  styleUrl: './task-action.scss',
})
export class TaskAction {
  private readonly _taskFacade = inject(TaskFacade);
  private readonly _router = inject(Router);
  private readonly _snackbar = inject(MatSnackBar);

  readonly taskId = input.required<string | undefined>();
  readonly taskStatus = input.required<TaskStatusModel | undefined>();
  readonly taskNextAction = input.required<TaskActionModel[] | null>();
  readonly reviews = input.required<ReviewModel[] | null>();
  readonly nextActionTriggered = output<TaskActionModel>();
  readonly currentReview = computed(() => this.reviews()?.find((review) => !review.closedDate));

  readonly urlLinkSubmitted = signal<string[]>([]);

  readonly urlForm = new FormGroup({
    urlLink: new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]),
  });

  onNextActionTrigger(): void {
    const taskNextAction = this.taskNextAction();
    if (!taskNextAction) return;

    this.nextActionTriggered.emit(taskNextAction[0]);
  }

  onSubmitUrl(): void {
    const urlLinkControl = this.urlForm.controls.urlLink;
    if (!urlLinkControl || urlLinkControl.invalid) return;

    const urlLink = urlLinkControl.value;
    if (!urlLink) return;

    if (this.urlLinkSubmitted().includes(urlLink)) {
      urlLinkControl.setErrors({ duplicate: true });
      return;
    }

    this.urlLinkSubmitted.update((urls) => [...urls, urlLink]);

    this.urlForm.reset();
  }

  onRemoveUrl(url: string): void {
    this.urlLinkSubmitted.update((urls) => urls.filter((urlStored) => urlStored !== url));
  }

  async onSubmitProgress(): Promise<void> {
    const urlLinks = this.urlLinkSubmitted();
    if (!urlLinks || urlLinks.length === 0) return;

    const taskId = this.taskId();
    if (!taskId) return;

    const data: Pick<ReviewModel, 'taskId' | 'proofUrls'> = {
      taskId,
      proofUrls: urlLinks,
    };

    try {
      const reviewId = await this._taskFacade.submitReview(data);
      const senderId = this._taskFacade.userId();
      if (!senderId) {
        throw new Error('senderId not present');
      }

      if (!reviewId) {
        throw new Error('reviewId not present');
      }

      const receiverId = this.currentReview()?.reviewerId;
      if (!receiverId) {
        throw new Error('reviewerId not present');
      }

      const notificationPayload: Omit<NotificationDTOModel, 'createdAt'> = {
        shortDescription: 'A review is now ready to be checked.',
        resourceType: 'review',
        resourceUrl: `${ROUTES_PARAMS.review}/${reviewId}`,
        receiverId,
        senderId,
        isRead: false,
      };

      await this._taskFacade
        .addNotification(notificationPayload)
        .catch((error) => console.error('REVIEW CREATION NOTIFICAITON ERROR', error));

      this.onNextActionTrigger();

      const snackbarRef = this._snackbar.open('Review created successfully', 'Dismiss', {
        duration: 3000,
      });
      snackbarRef.onAction().subscribe(() => snackbarRef.dismiss());

      this._router.navigate([ROUTES_PARAMS.review, reviewId]);
    } catch (error) {
      console.error('SUBMIT PROGRESS ERROR', error);

      const snackbarRef = this._snackbar.open('Review creation failed', 'Dismiss', {
        duration: 3000,
        panelClass: 'mat-error-state',
      });
      snackbarRef.onAction().subscribe(() => snackbarRef.dismiss());
    }
  }

  onViewCurrentReview(): void {
    const currentReview = this.currentReview();
    if (!currentReview) return;

    const currentReviewId: string = currentReview.id;

    this._router.navigate([ROUTES_PARAMS.review, currentReviewId]);
  }
}
