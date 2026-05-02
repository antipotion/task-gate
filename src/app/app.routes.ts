import { Routes } from '@angular/router';
import { TaskDetails } from './project/task/task-details/task-details';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'project',
    pathMatch: 'full',
  },
  {
    path: 'project',
    loadChildren: () => import('./project/project.routes').then((m) => m.projectRoutes),
  },
  {
    path: 'task',
    component: TaskDetails,
  },
];
