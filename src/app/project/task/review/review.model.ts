import { FieldValue } from 'firebase/firestore';
import { TaskStatus } from '../task.model';

export interface ReviewModel {
  id: string;
  taskId: string;
  projectId: string;
  proofUrls: string[];
  submittedById: string;
  submittedAt: Date | FieldValue;
  reviewerId: string;
  closedDate: Date | null;
  closeStatus: Extract<TaskStatus, 'APPROVED' | 'REJECTED'> | null;
}

export interface ReviewModelDTO {
  id: string;
  taskId: string;
  projectId: string;
  proofUrls: string[];
  submittedById: string;
  submittedAt: Date | FieldValue;
  reviewerId: string;
  closedDate: FieldValue | null;
  closeStatus: Extract<TaskStatus, 'APPROVED' | 'REJECTED'> | null;
}
