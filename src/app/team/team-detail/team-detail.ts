import { Component, computed, effect, inject, input, resource, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ROUTES_PARAMS } from '../../app.routes';
import { UserModel } from '../../authentication/auth-model/auth.model';
import { TeamFacade } from '../team-facade/team-facade';
import { TeamModel } from '../team-model/team.model';
import { TEAM_ROUTE_PARAMS } from '../team.routes';

@Component({
  selector: 'app-team-detail',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './team-detail.html',
  styleUrl: './team-detail.scss',
})
export class TeamDetail {
  private readonly _teamFacade = inject(TeamFacade);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  private readonly teams = computed(() => this._teamFacade.teams());
  private readonly teamId = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(TEAM_ROUTE_PARAMS.teamId))),
    { initialValue: null },
  );
  private readonly _userIds = signal<Set<string>>(new Set());
  private readonly _userNamesResource = resource({
    params: () => this._userIds(),
    loader: ({ params }) => this._teamFacade.getUsersById(params),
  });
  private readonly _userNames = computed<Map<string, UserModel> | null>(() => {
    const userResource = this._userNamesResource;
    if (!userResource.hasValue()) return null;
    const users = userResource.value();
    if (!users) return null;

    const userMap = new Map<string, UserModel>();

    for (const user of users) {
      const userId = user.id;
      userMap.set(userId, user);
    }

    return userMap;
  });

  readonly isMobile = input<boolean>(false);
  readonly currentTeam = signal<TeamModel | null>(null);
  readonly ownerName = computed<string | null>(() => {
    const userNames = this._userNames();
    const ownerId = this.currentTeam()?.creatorId;
    if (!userNames || !ownerId) return null;

    const ownerData = this._userNames()?.get(ownerId);
    if (!ownerData) return null;

    return `${ownerData.firstName} ${ownerData.lastName}`;
  });
  readonly membersName = computed<string[] | null>(() => {
    const userNames = this._userNames();
    const memberIds = this.currentTeam()?.memberIds;
    const ownerId = this.currentTeam()?.creatorId;
    if (!userNames || !memberIds || !ownerId) return null;

    const memberNames: string[] = [];
    for (const memberId of memberIds) {
      if (memberId === ownerId) continue;

      const memberData = userNames.get(memberId);
      if (!memberData) continue;

      const memberFirstName = memberData.firstName;
      const memberLastName = memberData.lastName;
      const memberFullName = `${memberFirstName} ${memberLastName}`;

      memberNames.push(memberFullName);
    }

    return memberNames;
  });

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

      const newUserIdsSet = new Set<string>([ownerOfCurrentTeam, ...membersOfCurrentTeam]);

      this._userIds.set(newUserIdsSet);

      // Clean up the current team to avoid stale data from persisting
      onCleanUp(() => this.currentTeam.set(null));
    });
  }

  onBack(): void {
    this._router.navigate([ROUTES_PARAMS.teams]);
  }
}
