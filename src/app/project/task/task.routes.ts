import type { Routes } from '@angular/router';
import { Task } from './task';

export const TaskRoutes: Routes = [
  {
    path: 'task/:id',
    component: Task,
    children: [],
  },
];
