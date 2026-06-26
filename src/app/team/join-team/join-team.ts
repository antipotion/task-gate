import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_PARAMS } from '../../app.routes';
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
  ],
  templateUrl: './join-team.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './join-team.scss',
})
export class JoinTeam {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _teamFacade = inject(TeamFacade);
  private readonly _snackbar = inject(MatSnackBar);

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
    }

    this._router.navigate([ROUTES_PARAMS.teams], { relativeTo: this._route.parent });
  }

  onBack(): void {
    this._teamFacade.goBack();
  }
}
