import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import type { Project } from '../../../project.model';

@Component({
  selector: 'app-edit-project-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
  ],
  templateUrl: './edit-project-dialog.html',
  styleUrl: './edit-project-dialog.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectDialog {
  readonly dialogRef = inject(MatDialogRef<EditProjectDialog>);
  readonly data = inject<Partial<Project>>(MAT_DIALOG_DATA);

  projectForm = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    deadline: new FormControl(this.data.deadline, Validators.required),
  });

  onCancel(): void {
    this.dialogRef.close();
  }
}
