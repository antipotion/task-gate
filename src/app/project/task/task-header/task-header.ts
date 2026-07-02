import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, effect, input, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeadlinePressureModel } from '../../project-model/project.model';
import { getDeadlinePressure } from '../../utility/deadlinePressureCalculator';

@Component({
  selector: 'app-task-header',
  imports: [MatProgressSpinnerModule, TitleCasePipe, NgClass],
  templateUrl: './task-header.html',
  styleUrl: './task-header.scss',
})
export class TaskHeader {
  readonly taskName = input.required<string | undefined>();
  readonly taskStatus = input.required<string | undefined>();
  readonly taskStartDate = input.required<Date | null>();
  readonly taskDeadline = input.required<Date | null>();

  readonly deadlinePressure = signal<DeadlinePressureModel | null>(null);

  constructor() {
    effect(() => {
      const startDate = this.taskStartDate();
      const deadline = this.taskDeadline();

      const deadlinePressure = getDeadlinePressure(startDate, deadline);
      this.deadlinePressure.set(deadlinePressure);
    });
  }
}
