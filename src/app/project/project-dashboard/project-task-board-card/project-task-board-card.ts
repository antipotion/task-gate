import { TitleCasePipe } from '@angular/common';
import { Component, computed, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { TaskFacade } from '../../task/task-facade';
import { Task, TaskStatus } from '../../task/task.model';

@Component({
  selector: 'app-project-task-board-card',
  imports: [TitleCasePipe],
  templateUrl: './project-task-board-card.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './project-task-board-card.scss',
})
export class ProjectTaskBoardCard {
  private readonly _taskFacade = inject(TaskFacade);

  private readonly _tasks = computed<Task[] | null>(() => this._taskFacade.tasks());

  readonly taskStatus = input.required<TaskStatus>();

  readonly tasks = computed<Task[] | null>(() => {
    const tasks = this._tasks();
    if (!tasks) return null;

    return tasks.filter((task) => task.status === this.taskStatus());
  });
}
