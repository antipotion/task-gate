import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { matchValueValidator } from '../../project-warning-dialog/project-warning-dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-warning-dialog',
  imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './task-warning-dialog.html',
  styleUrl: './task-warning-dialog.scss',
})
export class TaskWarningDialog {
  private readonly _dialogRef = inject(MatDialogRef<TaskWarningDialog>);
  private readonly _data = inject<string>(MAT_DIALOG_DATA);

  readonly taskName = computed(() => this._data);

  confirmTaskDeleteForm = new FormGroup({
    confirmTaskName: new FormControl('', { nonNullable: true, validators: [Validators.required, matchValueValidator(() => this.taskName())] }),
  });

  readonly confirmTaskNameControl = this.confirmTaskDeleteForm.controls.confirmTaskName;

  onConfirm(): void {
    const { confirmTaskName } = this.confirmTaskDeleteForm.getRawValue();

    this._dialogRef.close(confirmTaskName);
  }

  onCancel(): void {
    this._dialogRef.close();
  }
}
