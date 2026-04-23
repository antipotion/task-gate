import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-project-metrics',
  imports: [MatIconModule, MatProgressBarModule, MatChipsModule],
  templateUrl: './project-metrics.html',
  styleUrl: './project-metrics.scss',
})
export class ProjectMetrics {}
