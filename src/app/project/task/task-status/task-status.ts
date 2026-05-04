import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import type { TaskStatus as TaskStatusModel } from '../task.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-task-status',
  imports: [MatIconModule, MatChipsModule, MatButtonModule, TitleCasePipe],
  templateUrl: './task-status.html',
  styleUrl: './task-status.scss',
})
export class TaskStatus {
  taskStatus = input.required<TaskStatusModel | undefined>();
}

