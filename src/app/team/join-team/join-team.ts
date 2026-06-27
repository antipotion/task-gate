import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamFacade } from '../team-facade/team-facade';

@Component({
  selector: 'app-join-team',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './join-team.html',
  styleUrl: './join-team.scss',
})
export class JoinTeam {
  private readonly _teamFacade = inject(TeamFacade);
  private readonly _snackbar = inject(MatSnackBar);
  private readonly _dialogRef = inject(MatDialogRef<JoinTeam>);

  joinTeamForm = new FormGroup({
    teamId: new FormControl('', Validators.required),
  });

  readonly teamId = this.joinTeamForm.controls.teamId;

  async onJoinTeam(): Promise<void> {
    const teamId = this.teamId.getRawValue();
    if (!teamId) return;

    try {
      await this._teamFacade.joinTeam(teamId);
      this._snackbar.open('You have joined the team', 'Dismiss', { duration: 3000 });
    } catch (error) {
      console.error(error);
      this._snackbar.open('An error occured while joining the team', 'Dismiss', { duration: 3000 });
    } finally {
      this.onNoClick();
    }
  }

  onBack(): void {
    this._teamFacade.goBack();
  }

  onNoClick(): void {
    this._dialogRef.close();
  }
}
