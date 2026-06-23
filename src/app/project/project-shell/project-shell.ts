import { Component, computed, inject } from '@angular/core';
import { MobileShell } from '../../layout-shell/mobile-shell/mobile-shell';
import { TabletShell } from '../../layout-shell/tablet-shell/tablet-shell';
import { NavigationService } from '../../navigation/navigation-service';
import { ProjectDashboard } from '../project-dashboard/project-dashboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-shell',
  imports: [ProjectDashboard, TabletShell, MobileShell, MatButtonModule, MatIconModule],
  templateUrl: './project-shell.html',
  styleUrl: './project-shell.scss',
})
export class ProjectShell {
  private readonly _navigationService = inject(NavigationService);

  readonly isMobile = computed<boolean>(() => this._navigationService.isMobileScreen());
}
