import { Task, TaskAction, TaskStatus } from './task.model';

export type TransitionDefinition = {
  from: TaskStatus;
  action: TaskAction;
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
    to: 'SUBMITTED',
  },
  {
    from: 'SUBMITTED',
    action: 'BEGIN_REVIEW',
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

export function findTransition(status: TaskStatus, action: TaskAction): TransitionDefinition | null {
  return TRANSITIONS.find((t) => t.from === status && t.action === action) ?? null;
}

class InvalidTransitionError extends Error {
  constructor(
    public readonly from: TaskStatus,
    public readonly action: TaskAction,
  ) {
    super(`Invalid transition: ${from} -> ${action}`);
  }
}

export function transitionTask(task: Task, action: TaskAction): Task {
  const transition = findTransition(task.status, action);

  if (!transition) {
    throw new InvalidTransitionError(task.status, action);
  }

  const next: Task = {
    ...task,
    status: transition.to,
  }

  if (action === 'SUBMIT') {
    next.currentSubmissionVersion += 1;
  }

  return next;
}

export function getAvailableActions(task: Task): TaskAction | undefined {
  return TRANSITIONS.find((t) => t.from === task.status)?.action;
}
