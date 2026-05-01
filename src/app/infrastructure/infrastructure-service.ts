import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
  type DocumentData,
  type Firestore,
  type QuerySnapshot,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { db } from '../../environment/firebase.config';
import type { Project } from '../project/project.model';
import type { Task } from '../project/task/task.model';

@Injectable({
  providedIn: 'root',
})
export class InfrastructureService {
  private readonly db: Firestore = db;
  private readonly projectsCollection = collection(this.db, 'projects');
  private readonly tasksCollection = collection(this.db, 'tasks');

  async addProjectDocument(data: Omit<Project, 'id'>): Promise<string> {
    const result = await addDoc(this.projectsCollection, data);
    return result.id;
  }

  async addTaskDocument(data: Omit<Task, 'id'>): Promise<string> {
    const result = await addDoc(this.tasksCollection, data);
    return result.id;
  }

  listenToProjectsCollection$(): Observable<Project[]> {
    return new Observable<Project[]>((subscriber) => {
      const unsubscribe = onSnapshot(
        this.projectsCollection,
        (snapshot: QuerySnapshot<DocumentData>) => {
          const projects = snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
                deadline: doc.data()['deadline']?.toDate(), // Convert Firestore Timestamp to JavaScript Date
              }) as Project,
          );

          subscriber.next(projects);
        },
        (error) => {
          subscriber.error(error);
        },
      );

      return unsubscribe;
    });
  }

  async updateProject(id: string, dto: Partial<Project>): Promise<void> {
    const ref = doc(this.projectsCollection, id);

    return updateDoc(ref, { ...dto });
  }
}
