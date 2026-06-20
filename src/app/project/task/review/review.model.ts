import { FieldValue } from 'firebase/firestore';
import { TaskStatus } from '../task.model';

export interface ReviewModel {
  id: string;
  taskId: string;
  proofUrls: string[];
  submittedById: string;
  submittedAt: Date | FieldValue;
  reviewerId: string;
  closedDate: Date | FieldValue | null;
  closeStatus: Extract<TaskStatus, 'APPROVED' | 'REJECTED'> | null;
}
