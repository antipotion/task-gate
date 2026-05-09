import type { Routes } from '@angular/router';
import { Task } from './task';

export const TASK_ROUTE_PARAMS = {
  taskId: ':taskId',
} as const;

export const TaskRoutes: Routes = [
  {
    path: '',
    component: Task,
    children: [
      {
        path: '',
        loadComponent: () => import('./task-dashboard/task-dashboard').then((m) => m.TaskDashboard),
      },
      {
        path: TASK_ROUTE_PARAMS.taskId,
        loadComponent: () => import('./task-details/task-details').then((m) => m.TaskDetails),
      },
    ],
  },
];
