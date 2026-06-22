import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { FieldValue } from 'firebase/firestore';
import { TASK_ROUTE_PARAMS } from '../../task.routes';
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
    MatCardModule,
  ],
  templateUrl: './comment.html',
  styleUrl: './comment.scss',
})
export class Comment implements OnInit {
  private readonly _commentFacade = inject(CommentFacade);
  private readonly _route = inject(ActivatedRoute);

  private readonly _taskId = this._route.snapshot.paramMap.get(TASK_ROUTE_PARAMS.taskId);
  private readonly _reviewId = this._route.snapshot.paramMap.get(REVIEW_ROUTE_PARAMS.reviewId);

  readonly closedDate = input.required<Date | FieldValue | null>();

  readonly commentAuthors = signal<Map<string, string>>(new Map());

  readonly comments = computed(() => this._commentFacade.comments());

  commentForm = new FormGroup({
    commentContent: new FormControl<string>('', Validators.required),
  });

  readonly commentControl = this.commentForm.controls.commentContent;

  constructor() {
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

  ngOnInit(): void {
    const reviewId = this._reviewId;
    if (!reviewId) return;

    this._commentFacade.setReviewId(reviewId);
  }

  async addComment(): Promise<void> {
    const taskId = this._taskId;
    const reviewId = this._reviewId;
    if (!taskId || !reviewId) return;

    const content = this.commentControl.value;
    if (!content) return;

    this.commentForm.reset();

    await this._commentFacade.addComment(reviewId, taskId, content);
  }

  async getUserById(userId: string): Promise<string | null> {
    const result = await this._commentFacade.getUserById(userId);
    if (!result) return null;

    return `${result.firstName} ${result.lastName}`;
  }
}
