import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFacade } from '../../../auth-facade';
import { AUTH_ROUTE_PARAMS } from '../../../auth.routes';

@Component({
  selector: 'app-create-team',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './create-team.html',
  styleUrl: './create-team.scss',
})
export class CreateTeam {
  private _authFacade = inject(AuthFacade);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  teamForm = new FormGroup({
    teamName: new FormControl('', Validators.required),
  });

  readonly teamName = this.teamForm.controls.teamName;

  onCreateTeam(): void {
    const teamName = this.teamName.getRawValue();
    if (!teamName) return;

    // TODO: Handle error path
    this._authFacade.setTeamName(teamName);
    this._router.navigate([AUTH_ROUTE_PARAMS.signup], { relativeTo: this._route.parent?.parent });
  }
}
