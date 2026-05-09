import { Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-overview',
  imports: [MatChipsModule, MatIconModule],
  templateUrl: './project-overview.html',
  styleUrl: './project-overview.scss',
})
export class ProjectOverview {
  readonly deadline = input.required<string>();
}
