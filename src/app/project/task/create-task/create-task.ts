import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-task',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerInput,
    MatDatepickerModule,
    MatSelectModule,
  ],
  templateUrl: './create-task.html',
  styleUrl: './create-task.scss',
  providers: [provideNativeDateAdapter()],
})
export class CreateTask {
  private readonly _dialogRef = inject(MatDialogRef<CreateTask>);

  taskForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    deadline: new FormControl('', Validators.required),
    assigneeId: new FormControl(''),
  });

  onCancel(): void {
    this._dialogRef.close();
  }
}
