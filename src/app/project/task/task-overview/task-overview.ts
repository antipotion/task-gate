import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-task-overview',
  imports: [MatIconModule, MatChipsModule, DatePipe, MatProgressSpinnerModule],
  templateUrl: './task-overview.html',
  styleUrl: './task-overview.scss',
})
export class TaskOverview {
  readonly taskDeadline = input.required<string | null>();
  readonly taskDescription = input.required<string | null>();
}
