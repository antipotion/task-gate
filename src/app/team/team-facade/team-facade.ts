import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { StoreService } from '../../application/store/store-service';
import { TeamModel } from '../team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamFacade {
  private readonly _store = inject(StoreService);

  readonly teams = toSignal<TeamModel[] | null>(this._store.teams$, { initialValue: null });
}
