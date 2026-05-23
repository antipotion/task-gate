import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamModel } from '../../authentication/sign-up/team/team.model';
import { TeamFacade } from '../team-facade/team-facade';
import { TeamDashboardHeader } from './team-dashboard-header/team-dashboard-header';

@Component({
  selector: 'app-team-dashboard',
  imports: [TeamDashboardHeader],
  templateUrl: './team-dashboard.html',
  styleUrl: './team-dashboard.scss',
})
export class TeamDashboard {
  private readonly _teamFacade = inject(TeamFacade);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  readonly teamsList = computed<TeamModel[] | null>(() => this._teamFacade.teams());

  onAddTeam(): void {
    // this._router.navigate(commands)
  }
}
