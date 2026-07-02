import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MobileShell } from '../../layout-shell/mobile-shell/mobile-shell';
import { TabletShell } from '../../layout-shell/tablet-shell/tablet-shell';
import { CreateProject } from '../create-project/create-project';
import { ProjectDashboard } from '../project-dashboard/project-dashboard';
import { ProjectFacade } from '../project-facade/project-facade';

@Component({
  selector: 'app-project-shell',
  imports: [ProjectDashboard, TabletShell, MobileShell, MatButtonModule, MatIconModule],
  templateUrl: './project-shell.html',
  styleUrl: './project-shell.scss',
})
export class ProjectShell {
  private readonly _projectFacade = inject(ProjectFacade);
  private readonly _dialog = inject(MatDialog);

  readonly isMobile = computed<boolean>(() => this._projectFacade.isMobileScreen());

  onCreateProject(): void {
    this._dialog.open(CreateProject);
  }
}
