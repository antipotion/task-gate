import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ROUTES_PARAMS } from '../../app.routes';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private readonly _router = inject(Router);

  private readonly _historyStack: string[] = [];

  constructor() {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => this._historyStackPush(event.urlAfterRedirects));
  }

  private _historyStackPush(url: string): void {
    if (this._historyStack.at(-1) === url) return;

    this._historyStack.push(url);
  }

  private _historyStackPop(): string | undefined {
    return this._historyStack.pop();
  }

  goBack(): void {
    // Remove current page
    this._historyStackPop();

    const previous = this._historyStackPop();

    if (previous) {
      this._router.navigateByUrl(previous);
    } else {
      this._router.navigate([ROUTES_PARAMS.project]);
    }
  }
}
