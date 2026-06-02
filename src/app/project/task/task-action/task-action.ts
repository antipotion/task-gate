import { TitleCasePipe } from '@angular/common';
import { Component, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskActionModel, type TaskStatus as TaskStatusModel } from '../task.model';

@Component({
  selector: 'app-task-action',
  imports: [
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    TitleCasePipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './task-action.html',
  styleUrl: './task-action.scss',
})
export class TaskAction {
  private readonly _fileInput = viewChild<ElementRef<HTMLInputElement>>('file-input');

  readonly taskStatus = input.required<TaskStatusModel | undefined>();
  readonly taskNextAction = input.required<TaskActionModel | null>();
  readonly nextActionTriggered = output<TaskActionModel>();

  readonly selectedFileName = signal<string | null>(null);

  onNextActionTrigger(): void {
    const taskNextAction = this.taskNextAction();
    if (!taskNextAction) return;

    this.nextActionTriggered.emit(taskNextAction);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    this.selectedFileName.set(file.name);
  }

  onRemoveFile(): void {
    const fileInput = this._fileInput();

    this.selectedFileName.set(null);

    if (!fileInput) return;
    fileInput.nativeElement.value = '';
  }
}
