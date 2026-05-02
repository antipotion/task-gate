import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-status',
  imports: [MatIconModule, MatChipsModule, MatButtonModule],
  templateUrl: './task-status.html',
  styleUrl: './task-status.scss',
})
export class TaskStatus {}
