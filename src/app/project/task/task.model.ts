export type TaskStatus =
  | 'TODO'
  | 'IN-PROGRESS'
  | 'REVIEWING'
  | 'APPROVED'
  | 'REJECTED'

export type TaskActionModel =
  | 'START'
  | 'SUBMIT'
  | 'APPROVE'
  | 'REJECT'
  | 'RESUME';
  
export interface Task {
  projectId: string;
  id: string;
  name: string;
  creatorId: string;
  assigneeId: string;
  description: string;
  startDate: Date | null;
  deadline: Date | null;
  status: TaskStatus;
}
