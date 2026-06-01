import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { StoreService } from '../../application/store/store-service';
import { TeamModel } from '../team.model';
import { HistoryService } from '../../application/history/history-service';

@Injectable({
  providedIn: 'root',
})
export class TeamFacade {
  private readonly _store = inject(StoreService);
  private readonly _historyService = inject(HistoryService);

  readonly teams = toSignal<TeamModel[] | null>(this._store.teams$, { initialValue: null });

  goBack(): void {
    this._historyService.goBack();
  }
}
