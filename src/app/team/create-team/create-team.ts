import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_PARAMS } from '../../app.routes';
import { TeamFacade } from '../team-facade/team-facade';

@Component({
  selector: 'app-create-team',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './create-team.html',
  styleUrl: './create-team.scss',
})
export class CreateTeam {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _teamFacade = inject(TeamFacade);
  private readonly _dialogRef = inject(MatDialogRef<CreateTeam>);

  teamForm = new FormGroup({
    teamName: new FormControl('', Validators.required),
  });

  readonly teamName = this.teamForm.controls.teamName;

  async onCreateTeam(): Promise<void> {
    const teamName = this.teamName.getRawValue();
    if (!teamName) return;

    await this._teamFacade.addTeam(teamName);
    this._router.navigate([ROUTES_PARAMS.teams], { relativeTo: this._route?.parent });
    this.onNoClick();
  }

  onNoClick(): void {
    this._dialogRef.close();
  }
}
