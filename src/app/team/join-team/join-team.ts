import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFacade } from '../../authentication/auth-facade';
import { AUTH_ROUTE_PARAMS } from '../../authentication/auth.routes';

@Component({
  selector: 'app-join-team',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './join-team.html',
  styleUrl: './join-team.scss',
})
export class JoinTeam {
  private readonly _authFacade = inject(AuthFacade);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

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

    this._router.navigate([AUTH_ROUTE_PARAMS.signup], { relativeTo: this._route.parent?.parent });
  }
}
