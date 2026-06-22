import { FieldValue } from 'firebase/firestore';

export interface CommentModel {
  id: string;
  taskId: string;
  reviewId: string;
  authorId: string;
  content: string;
  createdAt: Date;
}

export interface CommentModelDTO {
  id: string;
  taskId: string;
  reviewId: string;
  authorId: string;
  content: string;
  createdAt: FieldValue;
}
