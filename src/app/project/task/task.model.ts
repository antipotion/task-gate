export type TaskStatus =
  | 'TODO'
  | 'IN-PROGRESS'
  | 'SUBMITTED'
  | 'REVIEWING'
  | 'APPROVED'
  | 'REJECTED'
  | 'COMPLETED';

export interface Task {
  projectId: string;
  id: string;
  name: string;
  description: string;
  deadline: string;
  status: TaskStatus;
}
