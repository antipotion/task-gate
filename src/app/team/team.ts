import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { TEAM_ROUTE_PARAMS } from './team.routes';

@Component({
  selector: 'app-team',
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './team.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './team.scss',
})
export class Team {
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  onCreateTeam(): void {
    this._router.navigate([TEAM_ROUTE_PARAMS.createTeam], { relativeTo: this._route });
  }

  onJoinTeam(): void {
    this._router.navigate([TEAM_ROUTE_PARAMS.joinTeam], { relativeTo: this._route });
  }
}
