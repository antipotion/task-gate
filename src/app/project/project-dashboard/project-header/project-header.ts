import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-project-header',
  imports: [MatProgressSpinnerModule],
  templateUrl: './project-header.html',
  styleUrl: './project-header.scss',
})
export class ProjectHeader {
  readonly projectName = input.required<string | undefined>();
}
