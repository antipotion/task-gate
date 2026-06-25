import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MobileShell } from '../../layout-shell/mobile-shell/mobile-shell';
import { TabletShell } from '../../layout-shell/tablet-shell/tablet-shell';
import { CreateProject } from '../create-project/create-project';
import { ProjectDashboard } from '../project-dashboard/project-dashboard';
import { ProjectDetails } from '../project-dashboard/project-details/project-details';
import { ProjectFacade } from '../project-facade/project-facade';
import { PROJECT_ROUTE_PARAMS } from '../project-route/project.routes';

@Component({
  selector: 'app-project-shell',
  imports: [
    ProjectDashboard,
    TabletShell,
    MobileShell,
    MatButtonModule,
    MatIconModule,
    ProjectDetails,
  ],
  templateUrl: './project-shell.html',
  styleUrl: './project-shell.scss',
})
export class ProjectShell {
  private readonly _projectFacade = inject(ProjectFacade);
  private readonly _dialog = inject(MatDialog);
  private readonly _route = inject(ActivatedRoute);

  readonly isMobile = computed<boolean>(() => this._projectFacade.isMobileScreen());
  readonly routeProjectId = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(PROJECT_ROUTE_PARAMS.projectId))),
    { initialValue: null },
  );

  onCreateProject(): void {
    this._dialog.open(CreateProject);
  }
}
