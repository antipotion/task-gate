import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamFacade } from '../../team-facade/team-facade';
import { TEAM_ROUTE_PARAMS } from '../../team.routes';

@Component({
  selector: 'app-team-dashboard-header',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './team-dashboard-header.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './team-dashboard-header.scss',
})
export class TeamDashboardHeader {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _teamFacade = inject(TeamFacade);

  onAddTeam(): void {
    this._router.navigate([TEAM_ROUTE_PARAMS.createTeam], { relativeTo: this._route?.parent });
  }

  onJoinTeam(): void {
    this._router.navigate([TEAM_ROUTE_PARAMS.joinTeam], { relativeTo: this._route?.parent });
  }

  onBack(): void {
    this._teamFacade.goBack();
  }
}
