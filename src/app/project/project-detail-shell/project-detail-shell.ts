import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MobileShell } from '../../layout-shell/mobile-shell/mobile-shell';
import { TabletShell } from '../../layout-shell/tablet-shell/tablet-shell';
import { ProjectDetails } from '../project-dashboard/project-details/project-details';
import { ProjectFacade } from '../project-facade/project-facade';
import { PROJECT_ROUTE_PARAMS } from '../project-route/project.routes';
import { ProjectTaskCategory } from '../project-task-category/project-task-category';
import { CreateTask } from '../task/create-task/create-task';

@Component({
  selector: 'app-project-detail-shell',
  imports: [
    ProjectDetails,
    MobileShell,
    MatButtonModule,
    MatIconModule,
    ProjectTaskCategory,
    TabletShell,
  ],
  templateUrl: './project-detail-shell.html',
  styleUrl: './project-detail-shell.scss',
})
export class ProjectDetailShell {
  private readonly _route = inject(ActivatedRoute);
  private readonly _projectFacade = inject(ProjectFacade);
  private readonly _dialog = inject(MatDialog);

  readonly isMobile = computed<boolean>(() => this._projectFacade.isMobileScreen());
  readonly routeProjectId = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(PROJECT_ROUTE_PARAMS.projectId))),
    { initialValue: null },
  );
  readonly routeProjectCategoryList = toSignal(
    this._route.paramMap.pipe(map((params) => params.get(PROJECT_ROUTE_PARAMS.taskCategory))),
  );

  async openAddTaskDialog(): Promise<void> {
    const dialogRef = this._dialog.open(CreateTask);
    const projectId = this.routeProjectId();
    if (!projectId) return;

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;
      // TODO: Handle the result of the operation (e.g. Success | Error)
      await this._projectFacade.addTask(projectId, result);
    });
  }
}
