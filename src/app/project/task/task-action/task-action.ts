import { TitleCasePipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  output,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_PARAMS } from '../../../app.routes';
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
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './task-action.scss',
})
export class TaskAction {
  private readonly _taskFacade = inject(TaskFacade);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  readonly taskId = input.required<string | undefined>();
  readonly taskStatus = input.required<TaskStatusModel | undefined>();
  readonly taskNextAction = input.required<TaskActionModel | null>();
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

    this.nextActionTriggered.emit(taskNextAction);
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

    const reviewId = await this._taskFacade.submitReview(data);
    this.onNextActionTrigger();

    this._router.navigate([ROUTES_PARAMS.review, reviewId], { relativeTo: this._route });
  }

  onViewCurrentReview(): void {
    const currentReview = this.currentReview();
    if (!currentReview) return;

    const currentReviewId: string = currentReview.id;

    this._router.navigate([ROUTES_PARAMS.review, currentReviewId]);
  }
}
