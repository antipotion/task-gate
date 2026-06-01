import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamFacade } from '../team-facade/team-facade';
import { TEAM_ROUTE_PARAMS } from '../team.routes';

@Component({
  selector: 'app-create-team',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './create-team.html',
  styleUrl: './create-team.scss',
})
export class CreateTeam {
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _teamFacade = inject(TeamFacade);

  teamForm = new FormGroup({
    teamName: new FormControl('', Validators.required),
  });

  readonly teamName = this.teamForm.controls.teamName;

  async onCreateTeam(): Promise<void> {
    const teamName = this.teamName.getRawValue();
    if (!teamName) return;

    await this._teamFacade.addTeam(teamName);
    this._router.navigate([TEAM_ROUTE_PARAMS.teamDashboard], { relativeTo: this._route?.parent });
  }

  onBack(): void {
    this._teamFacade.goBack();
  }
}
