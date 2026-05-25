import { Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-project-overview',
  imports: [MatChipsModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './project-overview.html',
  styleUrl: './project-overview.scss',
})
export class ProjectOverview {
  readonly deadline = input.required<string | null>();
  readonly description = input.required<string | null>();
}
