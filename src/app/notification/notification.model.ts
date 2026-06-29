import { FieldValue } from "firebase/firestore";

export type ResourceType = 'project' | 'task' | 'review' | 'discussion';

export interface NotificationModel {
  id: string;
  shortDescription: string;
  resourceUrl: string;
  resourceType: ResourceType;
  senderId: string;
  receiverId: string;
  isRead: boolean;
  createdAt: Date;
}


export interface NotificationDTOModel {
  shortDescription: string;
  resourceUrl: string;
  resourceType: ResourceType;
  senderId: string;
  receiverId: string;
  isRead: boolean;
  createdAt: FieldValue;
}