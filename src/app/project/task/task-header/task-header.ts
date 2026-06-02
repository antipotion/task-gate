import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-task-header',
  imports: [MatProgressSpinnerModule, TitleCasePipe, NgClass],
  templateUrl: './task-header.html',
  styleUrl: './task-header.scss',
})
export class TaskHeader {
  readonly taskName = input.required<string | undefined>();
  readonly taskStatus = input.required<string | undefined>();
}
