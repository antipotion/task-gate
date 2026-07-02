import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly _breakpointObserver = inject(BreakpointObserver);

  private readonly mobileScreen = '(max-width: 760px)';

  readonly isMobileScreen = toSignal(
    this._breakpointObserver.observe(this.mobileScreen).pipe(map((state) => state.matches)),
    { initialValue: this._breakpointObserver.isMatched(this.mobileScreen) },
  );
}
