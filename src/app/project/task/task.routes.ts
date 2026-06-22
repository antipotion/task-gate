import type { Routes } from '@angular/router';
import { Task } from './task';

export const TASK_ROUTE_PARAMS = {
  taskId: 'taskId',
  reviewList: 'reviewList',
} as const;

export const TASK_ROUTE_HELPERS = {
  taskReviewList: `:${TASK_ROUTE_PARAMS.taskId}/${TASK_ROUTE_PARAMS.reviewList}`,
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
        path: `:${TASK_ROUTE_PARAMS.taskId}`,
        loadComponent: () => import('./task-details/task-details').then((m) => m.TaskDetails),
      },
      {
        path: TASK_ROUTE_HELPERS.taskReviewList,
        loadComponent: () =>
          import('./task-review-list/task-review-list').then((m) => m.TaskReviewList),
      },
    ],
  },
];
