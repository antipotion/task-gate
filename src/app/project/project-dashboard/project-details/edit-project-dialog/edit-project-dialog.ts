import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import type { Project } from '../../../project.types';

@Component({
  selector: 'app-edit-project-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogClose,
  ],
  templateUrl: './edit-project-dialog.html',
  styleUrl: './edit-project-dialog.scss',
})
export class EditProjectDialog {
  readonly dialogRef = inject(MatDialogRef<EditProjectDialog>);
  readonly data = inject<Partial<Project>>(MAT_DIALOG_DATA);

  projectForm = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
  });

  onCancel(): void {
    this.dialogRef.close();
  }
}
