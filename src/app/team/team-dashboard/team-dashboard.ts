import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ROUTES_PARAMS } from '../../app.routes';
import { TeamFacade } from '../team-facade/team-facade';
import { TeamModel } from '../team-model/team.model';
import { TeamDashboardHeader } from './team-dashboard-header/team-dashboard-header';

@Component({
  selector: 'app-team-dashboard',
  imports: [
    TeamDashboardHeader,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    ClipboardModule,
  ],
  templateUrl: './team-dashboard.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './team-dashboard.scss',
})
export class TeamDashboard {
  private readonly _teamFacade = inject(TeamFacade);
  private readonly _snackbar = inject(MatSnackBar);
  private readonly _router = inject(Router);

  readonly teamsList = computed<TeamModel[] | null>(() => this._teamFacade.teams());

  onCopied(success: boolean): void {
    if (success) {
      this._snackbar.open('Invite code copied successfully', 'Dismiss', { duration: 3000 });
    } else {
      this._snackbar.open('Failed to copy invite code', 'Dismiss', { duration: 3000 });
    }
  }

  async onLeaveTeam(teamId: string): Promise<void> {
    try {
      await this._teamFacade.leaveTeam(teamId);
      this._snackbar.open('You have left the team', 'Dismiss', { duration: 3000 });
    } catch {
      this._snackbar.open('An error occured while leaving the team', 'Dismiss', { duration: 3000 });
    }
  }

  onViewTeam(teamId: string): void {
    this._router.navigate([ROUTES_PARAMS.teams, teamId]);
  }
}
