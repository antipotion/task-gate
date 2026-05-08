import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import type { Task } from '../task.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-task-edit',
  imports: [MatDialogModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatDatepickerModule],
  templateUrl: './task-edit.html',
  styleUrl: './task-edit.scss',
  providers: [provideNativeDateAdapter()],
})
export class TaskEdit {
  private readonly _dialogRef = inject(MatDialogRef<TaskEdit>);
  private readonly _data = inject<Partial<Task>>(MAT_DIALOG_DATA);

  taskEditForm = new FormGroup({
    name: new FormControl(this._data.name, Validators.required),
    description: new FormControl(this._data.description, Validators.required),
    deadline: new FormControl(this._data.deadline, Validators.required),
  });

  onSave(): void {
    this._dialogRef.close(this.taskEditForm.getRawValue());
  }

  onCancel(): void {
    this._dialogRef.close();
  }
}
