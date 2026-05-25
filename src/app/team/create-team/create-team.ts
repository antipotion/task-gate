import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFacade } from '../../authentication/auth-facade';
import { TEAM_ROUTE_PARAMS } from '../team.routes';

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

  async onCreateTeam(): Promise<void> {
    const teamName = this.teamName.getRawValue();
    if (!teamName) return;

    await this._authFacade.addTeam(teamName);
    this._router.navigate([TEAM_ROUTE_PARAMS.teamDashboard], { relativeTo: this._route?.parent });
  }
}
