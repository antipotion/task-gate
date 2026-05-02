import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-task-subtask',
  imports: [MatIconModule, MatCheckboxModule],
  templateUrl: './task-subtask.html',
  styleUrl: './task-subtask.scss',
})
export class TaskSubtask {}
