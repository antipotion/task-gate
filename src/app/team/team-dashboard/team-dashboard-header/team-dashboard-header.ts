import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { TEAM_ROUTE_PARAMS } from '../../team.routes';
import { ROUTES_PARAMS } from '../../../app.routes';

@Component({
  selector: 'app-team-dashboard-header',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './team-dashboard-header.html',
  styleUrl: './team-dashboard-header.scss',
})
export class TeamDashboardHeader {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  onAddTeam(): void {
    this._router.navigate([TEAM_ROUTE_PARAMS.createTeam], { relativeTo: this._route?.parent });
  }

  onJoinTeam(): void {
    this._router.navigate([TEAM_ROUTE_PARAMS.joinTeam], { relativeTo: this._route?.parent });
  }

  onBack(): void {
    this._router.navigate([ROUTES_PARAMS.project]);
  }
}
