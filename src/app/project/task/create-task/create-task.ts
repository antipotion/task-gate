import { Component, computed, inject, resource, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TeamMembersDialogData } from '../../project-detail-shell/project-detail-shell';
import { TaskFacade } from '../task-facade';

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
  private readonly _taskFacade = inject(TaskFacade);
  private readonly _dialogRef = inject(MatDialogRef<CreateTask>);
  private readonly _data = inject<TeamMembersDialogData>(MAT_DIALOG_DATA);

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

  taskForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    startDate: new FormControl<Date | null>(null),
    deadline: new FormControl<Date | null>(null),
    assigneeId: new FormControl(''),
  });

  onCancel(): void {
    this._dialogRef.close();
  }
}
