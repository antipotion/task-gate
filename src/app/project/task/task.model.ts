export type TaskStatus =
  | 'TODO'
  | 'IN-PROGRESS'
  | 'SUBMITTED'
  | 'REVIEWING'
  | 'APPROVED'
  | 'REJECTED'

export type TaskAction =
  | 'START'
  | 'SUBMIT'
  | 'BEGIN_REVIEW'
  | 'APPROVE'
  | 'REJECT'
  | 'RESUME';
  
export interface Task {
  projectId: string;
  id: string;
  name: string;
  description: string;
  deadline: string;
  status: TaskStatus;
  currentSubmissionVersion: number;
}
