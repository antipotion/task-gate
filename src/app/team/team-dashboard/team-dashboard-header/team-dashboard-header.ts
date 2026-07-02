import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ROUTES_PARAMS } from '../../../app.routes';
import { JoinTeam } from '../../join-team/join-team';

@Component({
  selector: 'app-team-dashboard-header',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './team-dashboard-header.html',
  styleUrl: './team-dashboard-header.scss',
})
export class TeamDashboardHeader {
  private readonly _router = inject(Router);
  private readonly _dialog = inject(MatDialog);

  onJoinTeam(): void {
    this._dialog.open(JoinTeam);
  }

  onBack(): void {
    this._router.navigate([ROUTES_PARAMS.project]);
  }
}
