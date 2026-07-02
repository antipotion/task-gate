import { RoleModel, UserModel } from '../../authentication/auth-model/auth.model';
import { Task, TaskActionModel, TaskStatus } from './task.model';

export type TransitionDefinition = {
  from: TaskStatus;
  action: TaskActionModel;
  to: TaskStatus;
  allowedRoles: RoleModel[];
};

const TRANSITIONS: readonly TransitionDefinition[] = [
  {
    from: 'TODO',
    action: 'START',
    to: 'IN-PROGRESS',
    allowedRoles: ['MEMBER'],
  },
  {
    from: 'IN-PROGRESS',
    action: 'SUBMIT',
    to: 'REVIEWING',
    allowedRoles: ['MEMBER'],
  },
  {
    from: 'REVIEWING',
    action: 'APPROVE',
    to: 'APPROVED',
    allowedRoles: ['MANAGER'],
  },
  {
    from: 'REVIEWING',
    action: 'REJECT',
    to: 'REJECTED',
    allowedRoles: ['MANAGER'],
  },
  {
    from: 'REJECTED',
    action: 'RESUME',
    to: 'IN-PROGRESS',
    allowedRoles: ['MEMBER'],
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

class PermissionDeniedError extends Error {
  constructor(public readonly role: RoleModel) {
    super(`Role ${role} is not allowed to perform this action`);
  }
}

class NotAssigneeError extends Error {
  constructor() {
    super('Only the assignee can perform this action');
  }
}

export function transitionTask(task: Task, action: TaskActionModel, ctx: UserModel): Task {
  const transition = findTransition(task.status, action);

  if (!transition) {
    throw new InvalidTransitionError(task.status, action);
  }

  if (task.assigneeId !== ctx.id && !transition.allowedRoles.includes(ctx.role)) {
    throw new PermissionDeniedError(ctx.role);
  }

  // Enforce assignee-only actions where relevant
  if (
    (action === 'START' || action === 'SUBMIT' || action === 'RESUME') &&
    task.assigneeId !== ctx.id
  ) {
    throw new NotAssigneeError();
  }

  const next: Task = {
    ...task,
    status: transition.to,
  };

  return next;
}

export function getAvailableActions(
  task: Task,
  role: RoleModel,
  actorId: string,
): TaskActionModel[] | undefined {
  const nextAction = TRANSITIONS.filter((t) => t.from === task.status).map((t) => t.action);
  const filter = TRANSITIONS.filter((t) => t.from === task.status)
    .filter((t) => t.allowedRoles.includes(role))
    .filter((t) => {
      if (
        t.action === 'START' ||
        t.action === 'SUBMIT' ||
        (t.action === 'RESUME' && task.assigneeId !== actorId)
      ) {
        return false;
      }
      return true;
    })
    .map((t) => t.action);

  // If the creator assigned task to themselves give the next action immediately
  if (task.assigneeId === actorId) {
    return nextAction;
  }

  return filter;
}
