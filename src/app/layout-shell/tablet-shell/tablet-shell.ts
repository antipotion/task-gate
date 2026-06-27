import { NgClass } from '@angular/common';
import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ROUTES_PARAMS } from '../../app.routes';
import { ProjectFacade } from '../../project/project-facade/project-facade';

@Component({
  selector: 'app-tablet-shell',
  imports: [
    MatIconModule,
    MatButtonModule,
    NgClass,
    MatProgressSpinnerModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './tablet-shell.html',
  styleUrl: './tablet-shell.scss',
})
export class TabletShell {
  private readonly _router = inject(Router);
  private readonly _projectFacade = inject(ProjectFacade);
  private readonly _destroyRef = inject(DestroyRef);

  readonly withSecondary = input<boolean>(false);
  readonly isMenuExpanded = signal<boolean>(false);
  readonly logoutLoading = signal<boolean>(false);

  onToggleIsMenuExpanded(): void {
    this.isMenuExpanded.update((value) => !value);
  }

  onClickProjectDashboard(): void {
    this._router.navigate([ROUTES_PARAMS.project]);
  }

  onClickTeamDashboard(): void {
    this._router.navigate([ROUTES_PARAMS.teams]);
  }

  async onLogout(): Promise<void> {
    this.logoutLoading.set(true);
    await this._projectFacade.logout();
    this._router.navigate([ROUTES_PARAMS.auth]);

    this._destroyRef.onDestroy(() => this.logoutLoading.set(false));
  }
}
