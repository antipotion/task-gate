import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MobileShell } from '../../layout-shell/mobile-shell/mobile-shell';
import { TabletShell } from '../../layout-shell/tablet-shell/tablet-shell';
import { TeamDashboard } from '../team-dashboard/team-dashboard';
import { TeamDetail } from '../team-detail/team-detail';
import { TeamFacade } from '../team-facade/team-facade';
import { TEAM_ROUTE_PARAMS } from '../team.routes';

@Component({
  selector: 'app-team-shell',
  imports: [MobileShell, TabletShell, TeamDashboard, TeamDetail],
  templateUrl: './team-shell.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './team-shell.scss',
})
export class TeamShell {
  private readonly _teamFacade = inject(TeamFacade);
  private readonly _route = inject(ActivatedRoute);

  readonly routeTeamId = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(TEAM_ROUTE_PARAMS.teamId))),
    { initialValue: null },
  );

  readonly isMobileScreen = computed(() => this._teamFacade.isMobileScreen());
}
