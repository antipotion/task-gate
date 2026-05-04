import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-task',
  imports: [RouterOutlet],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class Task {}
