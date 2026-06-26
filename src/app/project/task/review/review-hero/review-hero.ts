import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { TaskStatus } from '../../task.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-review-hero',
  imports: [NgClass, TitleCasePipe, MatButtonModule, MatIconModule],
  templateUrl: './review-hero.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './review-hero.scss',
})
export class ReviewHero {
  readonly closeStatus = input.required<Extract<TaskStatus, 'APPROVED' | 'REJECTED'> | null>();
  readonly submittedBy = input.required<string | null>();
  readonly reviewer = input.required<string | null>();

  readonly backEvent = output<void>();

  onBack(): void {
    this.backEvent.emit();
  }
}
