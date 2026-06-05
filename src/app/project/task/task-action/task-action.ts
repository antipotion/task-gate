import { TitleCasePipe } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-action.html',
  styleUrl: './task-action.scss',
})
export class TaskAction {
  readonly taskStatus = input.required<TaskStatusModel | undefined>();
  readonly taskNextAction = input.required<TaskActionModel | null>();
  readonly nextActionTriggered = output<TaskActionModel>();

  readonly urlLinkSubmitted = signal<string[]>([]);

  readonly urlForm = new FormGroup({
    urlLink: new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]),
  });

  onNextActionTrigger(): void {
    const taskNextAction = this.taskNextAction();
    if (!taskNextAction) return;

    this.nextActionTriggered.emit(taskNextAction);
  }

  onSubmitUrl(): void {
    const urlLinkControl = this.urlForm.controls.urlLink;
    if (!urlLinkControl || urlLinkControl.invalid) return;

    const urlLink = urlLinkControl.value;
    if (!urlLink) return;

    if (this.urlLinkSubmitted().includes(urlLink)) {
      urlLinkControl.setErrors({ duplicate: true });
      return;
    }

    this.urlLinkSubmitted.update((urls) => [...urls, urlLink]);

    this.urlForm.reset();
  }

  onRemoveUrl(url: string): void {
    this.urlLinkSubmitted.update((urls) => urls.filter((urlStored) => urlStored !== url));
  }

  onSubmitProgress(): void {
    const urlLinks = this.urlLinkSubmitted();
    if (!urlLinks || urlLinks.length === 0) return;

    this.onNextActionTrigger();
  }
}
