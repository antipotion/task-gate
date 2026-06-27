import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MobileShell } from '../../layout-shell/mobile-shell/mobile-shell';
import { TabletShell } from '../../layout-shell/tablet-shell/tablet-shell';
import { CreateTeam } from '../create-team/create-team';
import { TeamDashboard } from '../team-dashboard/team-dashboard';
import { TeamDetail } from '../team-detail/team-detail';
import { TeamFacade } from '../team-facade/team-facade';
import { TEAM_ROUTE_PARAMS } from '../team.routes';

@Component({
  selector: 'app-team-shell',
  imports: [MobileShell, TabletShell, TeamDashboard, TeamDetail, MatButtonModule, MatIconModule],
  templateUrl: './team-shell.html',
  styleUrl: './team-shell.scss',
})
export class TeamShell {
  private readonly _teamFacade = inject(TeamFacade);
  private readonly _route = inject(ActivatedRoute);
  private readonly _dialog = inject(MatDialog);

  readonly routeTeamId = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(TEAM_ROUTE_PARAMS.teamId))),
    { initialValue: null },
  );

  readonly isMobileScreen = computed(() => this._teamFacade.isMobileScreen());

  onAddTeam(): void {
    this._dialog.open(CreateTeam);
  }
}
