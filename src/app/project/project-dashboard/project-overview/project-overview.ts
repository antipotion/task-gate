import { DatePipe } from '@angular/common';
import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-project-overview',
  imports: [MatIconModule, MatProgressSpinnerModule, DatePipe, MatProgressBarModule],
  templateUrl: './project-overview.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './project-overview.scss',
})
export class ProjectOverview {
  readonly startDate = input.required<Date | null>();
  readonly deadline = input.required<Date | null>();
  readonly description = input.required<string | null>();
  readonly projectOwnerFullName = input.required<string | null>();
  readonly currentProgress = input.required<number | null>();
  readonly overdueTasksCount = input.required<number | null>();
}
