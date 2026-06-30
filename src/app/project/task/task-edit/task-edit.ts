import { Component, computed, inject, resource, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskFacade } from '../task-facade';
import type { Task } from '../task.model';

interface TaskEditModel extends Partial<Task> {
  teamMembers: string[];
}

@Component({
  selector: 'app-task-edit',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  templateUrl: './task-edit.html',
  styleUrl: './task-edit.scss',
  providers: [provideNativeDateAdapter()],
})
export class TaskEdit {
  private readonly _taskFacade = inject(TaskFacade);
  private readonly _dialogRef = inject(MatDialogRef<TaskEdit>);
  private readonly _data = inject<Partial<TaskEditModel>>(MAT_DIALOG_DATA);

  private readonly _usersResource = resource({
    params: () => this.teamMembersId(),
    loader: ({ params }) => this._taskFacade.getUsersById(params),
  });

  readonly teamMembersId = signal<Set<string>>(new Set(this._data.teamMembers));
  readonly teamMembers = computed<Map<string, string> | null>(() => {
    const users = this._usersResource.value();
    if (!users) return null;

    const teamMembersMap = new Map<string, string>();
    for (const user of users) {
      const firstName = user.firstName;
      const lastName = user.lastName;
      const fullName = `${firstName} ${lastName}`;

      teamMembersMap.set(user.id, fullName);
    }

    return teamMembersMap;
  });

  taskEditForm = new FormGroup({
    name: new FormControl(this._data.name, Validators.required),
    description: new FormControl(this._data.description, Validators.required),
    startDate: new FormControl(this._data.startDate),
    deadline: new FormControl(this._data.deadline),
    assigneeId: new FormControl(this._data.assigneeId),
  });

  onCancel(): void {
    this._dialogRef.close();
  }
}
