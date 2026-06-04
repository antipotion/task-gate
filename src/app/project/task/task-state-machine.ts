import { Task, TaskActionModel, TaskStatus } from './task.model';

export type TransitionDefinition = {
  from: TaskStatus;
  action: TaskActionModel;
  to: TaskStatus;
};

const TRANSITIONS: readonly TransitionDefinition[] = [
  {
    from: 'TODO',
    action: 'START',
    to: 'IN-PROGRESS',
  },
  {
    from: 'IN-PROGRESS',
    action: 'SUBMIT',
    to: 'REVIEWING',
  },
  {
    from: 'REVIEWING',
    action: 'APPROVE',
    to: 'APPROVED',
  },
  {
    from: 'REVIEWING',
    action: 'REJECT',
    to: 'REJECTED',
  },
  {
    from: 'REJECTED',
    action: 'RESUME',
    to: 'IN-PROGRESS',
  },
] as const;

export function findTransition(
  status: TaskStatus,
  action: TaskActionModel,
): TransitionDefinition | null {
  return TRANSITIONS.find((t) => t.from === status && t.action === action) ?? null;
}

class InvalidTransitionError extends Error {
  constructor(
    public readonly from: TaskStatus,
    public readonly action: TaskActionModel,
  ) {
    super(`Invalid transition: ${from} -> ${action}`);
  }
}

export function transitionTask(task: Task, action: TaskActionModel): Task {
  const transition = findTransition(task.status, action);

  if (!transition) {
    throw new InvalidTransitionError(task.status, action);
  }

  const next: Task = {
    ...task,
    status: transition.to,
  };

  if (action === 'SUBMIT') {
    next.currentSubmissionVersion += 1;
  }

  return next;
}

export function getAvailableActions(task: Task): TaskActionModel | undefined {
  return TRANSITIONS.find((t) => t.from === task.status)?.action;
}
