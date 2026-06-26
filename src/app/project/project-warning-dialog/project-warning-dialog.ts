import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  type AbstractControl,
  type ValidationErrors,
  type ValidatorFn,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-project-warning-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './project-warning-dialog.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './project-warning-dialog.scss',
})
export class ProjectWarningDialog {
  private readonly _dialogRef = inject(MatDialogRef<ProjectWarningDialog>);
  private readonly _data = inject<string>(MAT_DIALOG_DATA);

  readonly projectName = computed(() => this._data);

  confirmDeleteForm = new FormGroup({
    confirmProjectName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, matchValueValidator(() => this.projectName())],
    }),
  });

  readonly confirmProjectNameControl = this.confirmDeleteForm.controls.confirmProjectName;

  onConfirm(): void {
    const { confirmProjectName } = this.confirmDeleteForm.getRawValue();

    this._dialogRef.close(confirmProjectName);
  }

  onCancel(): void {
    this._dialogRef.close();
  }
}

export function matchValueValidator(getExpected: () => string): ValidatorFn {
  return (control: AbstractControl<string | null>): ValidationErrors | null => {
    const expected = getExpected();
    const value = control.value;

    // Don't validate empty
    if (!value) return null;

    return value === expected ? null : { mismatch: { expected, actual: value } };
  };
}
