import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskFacade } from './task-facade';

@Component({
  selector: 'app-task',
  imports: [RouterOutlet],
  templateUrl: './task.html',
  styleUrl: './task.scss',
  providers: [TaskFacade],
})
export class Task {}
