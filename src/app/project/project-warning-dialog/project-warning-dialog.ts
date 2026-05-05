import { Component, computed, inject } from '@angular/core';
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
  styleUrl: './project-warning-dialog.scss',
})
export class ProjectWarningDialog {
  readonly dialogRef = inject(MatDialogRef<ProjectWarningDialog>);
  private readonly data = inject<string>(MAT_DIALOG_DATA);

  projectName = computed(() => this.data);

  confirmDeleteForm = new FormGroup({
    confirmProjectName: new FormControl('', {
      validators: [Validators.required, matchValueValidator(this.projectName())],
    }),
  });

  onConfirm(): void {
    const confirmProjectName = this.confirmDeleteForm.getRawValue();
    console.log(confirmProjectName);

    if (!confirmProjectName) return;

    this.dialogRef.close(confirmProjectName);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

function matchValueValidator(expected: string): ValidatorFn {
  return (control: AbstractControl<string | null>): ValidationErrors | null => {
    const value = control.value;

    // Don't validate empty
    if (!value) return null;

    return value === expected ? null : { mismatch: { expected, actual: value } };
  };
}
