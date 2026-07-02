import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskStatus } from '../../task.model';

@Component({
  selector: 'app-review-hero',
  imports: [NgClass, TitleCasePipe, MatButtonModule, MatIconModule],
  templateUrl: './review-hero.html',
  styleUrl: './review-hero.scss',
})
export class ReviewHero {
  readonly closeStatus = input.required<Extract<TaskStatus, 'APPROVED' | 'REJECTED'> | null>();
  readonly submittedBy = input.required<string | null>();
  readonly reviewer = input.required<string | null>();
  readonly reviewId = input.required<string | null>();

  readonly backEvent = output<void>();

  onBack(): void {
    this.backEvent.emit();
  }
}
