import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeadlinePressureModel, ProjectStatusModel } from '../../project-model/project.model';

@Component({
  selector: 'app-project-header',
  imports: [MatProgressSpinnerModule, TitleCasePipe, NgClass],
  templateUrl: './project-header.html',
  styleUrl: './project-header.scss',
})
export class ProjectHeader {
  readonly projectName = input.required<string | undefined>();
  readonly projectStatus = input.required<ProjectStatusModel | null>();
  readonly projectDeadlinePressure = input.required<DeadlinePressureModel | null>();
}
