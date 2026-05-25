import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TeamFacade } from '../team-facade/team-facade';
import { TeamModel } from '../team.model';
import { TeamDashboardHeader } from './team-dashboard-header/team-dashboard-header';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-team-dashboard',
  imports: [TeamDashboardHeader, MatButtonModule, MatIconModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './team-dashboard.html',
  styleUrl: './team-dashboard.scss',
})
export class TeamDashboard {
  private readonly _teamFacade = inject(TeamFacade);

  readonly teamsList = computed<TeamModel[] | null>(() => this._teamFacade.teams());
}
