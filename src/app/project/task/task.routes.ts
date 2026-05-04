import type { Routes } from '@angular/router';
import { Task } from './task';
import { TaskDetails } from './task-details/task-details';

export const TaskRoutes: Routes = [
  {
    path: ':taskId',
    component: Task,
    children: [
      {
        path: '',
        component: TaskDetails,
      },
    ],
  },
];
