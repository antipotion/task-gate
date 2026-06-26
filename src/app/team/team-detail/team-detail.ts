import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { TeamFacade } from '../team-facade/team-facade';
import { TeamModel } from '../team-model/team.model';
import { TEAM_ROUTE_PARAMS } from '../team.routes';

@Component({
  selector: 'app-team-detail',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './team-detail.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './team-detail.scss',
})
export class TeamDetail {
  private readonly _teamFacade = inject(TeamFacade);
  private readonly _route = inject(ActivatedRoute);

  private readonly teams = computed(() => this._teamFacade.teams());
  private readonly teamId = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(TEAM_ROUTE_PARAMS.teamId))),
    { initialValue: null },
  );
  private readonly _userIds = signal<Set<string>>(new Set());

  readonly isMobile = input<boolean>(false);
  readonly currentTeam = signal<TeamModel | null>(null);

  constructor() {
    effect((onCleanUp) => {
      const teamId = this.teamId();
      const teams = this.teams();
      if (!teamId || !teams) return;

      const currentTeam = teams.find((team) => team.id === teamId);
      if (!currentTeam) return;

      this.currentTeam.set(currentTeam);

      const ownerOfCurrentTeam = currentTeam.creatorId;
      const membersOfCurrentTeam = currentTeam.memberIds;

      if (!ownerOfCurrentTeam || !membersOfCurrentTeam) return;

      this._userIds.update((userIds) => userIds.add(ownerOfCurrentTeam));

      for (const member of membersOfCurrentTeam) {
        this._userIds.update((userIds) => userIds.add(member));
      }

      // Clean up the current team to avoid stale data from persisting
      onCleanUp(() => this.currentTeam.set(null));
    });
  }
}
