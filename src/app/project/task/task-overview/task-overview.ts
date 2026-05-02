import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-overview',
  imports: [MatIconModule, MatChipsModule],
  templateUrl: './task-overview.html',
  styleUrl: './task-overview.scss',
})
export class TaskOverview {}
