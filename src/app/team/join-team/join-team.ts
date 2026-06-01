import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFacade } from '../../authentication/auth-facade';
import { TeamFacade } from '../team-facade/team-facade';
import { TEAM_ROUTE_PARAMS } from '../team.routes';

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
  styleUrl: './join-team.scss',
})
export class JoinTeam {
  private readonly _authFacade = inject(AuthFacade);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _teamFacade = inject(TeamFacade);

  joinTeamForm = new FormGroup({
    teamId: new FormControl('', Validators.required),
  });

  readonly teamId = this.joinTeamForm.controls.teamId;

  onJoinTeam(): void {
    const teamId = this.teamId.getRawValue();
    if (!teamId) return;

    try {
      this._authFacade.joinTeam(teamId);
    } catch (error) {
      console.error(error);
    }

    this._router.navigate([TEAM_ROUTE_PARAMS.teamDashboard], { relativeTo: this._route.parent });
  }

  onBack(): void {
    this._teamFacade.goBack();
  }
}
