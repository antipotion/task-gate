import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TaskAction, type TaskStatus as TaskStatusModel } from '../task.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-task-status',
  imports: [MatIconModule, MatChipsModule, MatButtonModule, TitleCasePipe],
  templateUrl: './task-status.html',
  styleUrl: './task-status.scss',
})
export class TaskStatus {
  readonly taskStatus = input.required<TaskStatusModel | undefined>();
  readonly taskNextAction = input.required<TaskAction | null>();
  readonly nextActionTriggered = output<TaskAction>();

  onNextActionTrigger(): void {
    const taskNextAction = this.taskNextAction();
    if (!taskNextAction) return;
    
    this.nextActionTriggered.emit(taskNextAction);
  }
}
