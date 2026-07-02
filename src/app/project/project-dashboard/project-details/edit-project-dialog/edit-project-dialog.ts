import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import type { Project } from '../../../project-model/project.model';

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
  private readonly _dialogRef = inject(MatDialogRef<EditProjectDialog>);
  readonly data = inject<Partial<Project>>(MAT_DIALOG_DATA);

  projectForm = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    startDate: new FormControl<Date | null>(this.data.startDate ?? null),
    deadline: new FormControl<Date | null>(this.data.deadline ?? null),
  });

  onCancel(): void {
    this._dialogRef.close();
  }
}
