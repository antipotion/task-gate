import type { Routes } from '@angular/router';
import { Task } from './task';

export const TASK_ROUTE_PARAMS = {
  TASK_ID: 'taskId',
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
        path: ':taskId',
        loadComponent: () => import('./task-details/task-details').then((m) => m.TaskDetails),
      },
    ],
  },
];
