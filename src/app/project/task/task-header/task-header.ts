import { Component, input } from '@angular/core';

@Component({
  selector: 'app-task-header',
  imports: [],
  templateUrl: './task-header.html',
  styleUrl: './task-header.scss',
})
export class TaskHeader {
  readonly taskName = input.required<string>();
}
