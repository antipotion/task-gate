import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ROUTES_PARAMS } from '../../app.routes';
import { ProjectFacade } from '../../project/project-facade/project-facade';

@Component({
  selector: 'app-mobile-shell',
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './mobile-shell.html',
  styleUrl: './mobile-shell.scss',
})
export class MobileShell {
  private readonly _projectFacade = inject(ProjectFacade);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);

  readonly logoutLoading = signal<boolean>(false);

  async onLogout(): Promise<void> {
    this.logoutLoading.set(true);
    await this._projectFacade.logout();
    this._router.navigate([ROUTES_PARAMS.auth]);

    this._destroyRef.onDestroy(() => this.logoutLoading.set(false));
  }
}
