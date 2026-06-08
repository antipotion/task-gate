import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-review-resource',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './review-resource.html',
  styleUrl: './review-resource.scss',
})
export class ReviewResource {
  readonly proofUrls = input.required<string[] | undefined>();
}
