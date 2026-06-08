import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { TaskStatus } from '../../task.model';

@Component({
  selector: 'app-review-hero',
  imports: [NgClass, TitleCasePipe],
  templateUrl: './review-hero.html',
  styleUrl: './review-hero.scss',
})
export class ReviewHero {
  readonly closeStatus = input.required<Extract<TaskStatus, 'APPROVED' | 'REJECTED'> | null>();
  readonly submittedBy = input.required<string | null>();
  readonly reviewer = input.required<string | null>();
}
