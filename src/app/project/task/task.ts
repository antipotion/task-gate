import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskFacade } from './task-facade';

@Component({
  selector: 'app-task',
  imports: [RouterOutlet],
  templateUrl: './task.html',
  styleUrl: './task.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [TaskFacade],
})
export class Task {}
