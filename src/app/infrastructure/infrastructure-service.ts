import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  onSnapshot,
  type DocumentData,
  type Firestore,
  type QuerySnapshot,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { db } from '../../environment/firebase.config';
import type { Project } from '../project/project.types';

@Injectable({
  providedIn: 'root',
})
export class InfrastructureService {
  private readonly db: Firestore = db;
  private readonly projectsCollection = collection(this.db, 'projects');

  async addProjectDocument(data: Omit<Project, 'id'>): Promise<string> {
    const result = await addDoc(this.projectsCollection, data);
    return result.id;
  }

  listenToProjectsCollection$(): Observable<Project[]> {
    return new Observable<Project[]>((subscriber) => {
      const unsubscribe = onSnapshot(
        this.projectsCollection,
        (snapshot: QuerySnapshot<DocumentData>) => {
          const projects = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Project[];

          subscriber.next(projects);
        },
        (error) => {
          subscriber.error(error);
        },
      );

      return unsubscribe;
    });
  }
}
