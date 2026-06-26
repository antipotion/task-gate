import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-review',
  imports: [RouterOutlet],
  templateUrl: './review.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './review.scss',
})
export class Review {}
