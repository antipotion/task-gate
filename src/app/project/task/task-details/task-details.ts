import { Component, computed, inject, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskComment } from '../task-comment/task-comment';
import { TaskDependency } from '../task-dependency/task-dependency';
import { TaskFacade } from '../task-facade';
import { TaskHeader } from '../task-header/task-header';
import { TaskHistory } from '../task-history/task-history';
import { TaskOverview } from '../task-overview/task-overview';
import { TaskStatus } from '../task-status/task-status';
import { TaskSubtask } from '../task-subtask/task-subtask';
import { TaskTime } from '../task-time/task-time';
import { TASK_ROUTE_PARAMS } from '../task.routes';

@Component({
  selector: 'app-task-details',
  imports: [
    TaskHeader,
    TaskOverview,
    TaskStatus,
    TaskDependency,
    TaskSubtask,
    TaskTime,
    TaskComment,
    TaskHistory,
  ],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
})
export class TaskDetails implements OnInit {
  private taskFacade = inject(TaskFacade);
  private router = inject(ActivatedRoute);

  taskId = this.router.snapshot.paramMap.get(TASK_ROUTE_PARAMS.TASK_ID) || '';

  activeTask = computed(() => this.taskFacade.activeTask());

  ngOnInit(): void {
    this.taskFacade.selectTaskId(this.taskId);
  }
}
