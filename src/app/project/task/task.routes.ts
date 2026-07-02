import type { Routes } from '@angular/router';

export const TASK_ROUTE_PARAMS = {
  taskId: 'taskId',
  reviewList: 'reviewList',
} as const;

const TASK_ROUTE_HELPERS = {
  taskReviewList: `:${TASK_ROUTE_PARAMS.taskId}/${TASK_ROUTE_PARAMS.reviewList}`,
} as const;

export const TaskRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./task-detail-shell/task-detail-shell').then((m) => m.TaskDetailShell),
      },
      {
        path: `:${TASK_ROUTE_PARAMS.taskId}`,
        loadComponent: () =>
          import('./task-detail-shell/task-detail-shell').then((m) => m.TaskDetailShell),
      },
      {
        path: TASK_ROUTE_HELPERS.taskReviewList,
        loadComponent: () =>
          import('./task-detail-shell/task-detail-shell').then((m) => m.TaskDetailShell),
      },
    ],
  },
];
