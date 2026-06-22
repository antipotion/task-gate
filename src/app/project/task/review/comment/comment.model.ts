import { FieldValue } from 'firebase/firestore';

export interface CommentModel {
  id: string;
  taskId: string;
  reviewId: string;
  authorId: string;
  content: string;
  createdAt: Date | FieldValue;
}
