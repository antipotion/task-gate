import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
  type DocumentData,
  type Firestore,
  type QueryDocumentSnapshot,
  type QuerySnapshot,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { db } from '../../environment/firebase.config';
import type { Project } from '../project/project.model';
import type { Task } from '../project/task/task.model';
import { ProjectRepository } from '../application/repository/project-repository';

@Injectable({
  providedIn: 'root',
})
export class FirestoreProjectRepository extends ProjectRepository {
  private readonly db: Firestore = db;
  private readonly projectsCollection = collection(this.db, 'projects');
  private readonly tasksCollection = collection(this.db, 'tasks');

  listenToProjects$(): Observable<Project[]> {
    return new Observable<Project[]>((subscriber) => {
      const unsubscribe = onSnapshot(
        this.projectsCollection,
        (snapshot: QuerySnapshot<DocumentData>) => {
          const projects = snapshot.docs.map((doc) => this.mapToProject(doc));

          subscriber.next(projects);
        },
        (error) => {
          subscriber.error(error);
        },
      );

      return () => unsubscribe();
    });
  }

  async addProject(data: Omit<Project, 'id'>): Promise<string> {
    const result = await addDoc(this.projectsCollection, data);
    return result.id;
  }

  async addTask(data: Omit<Task, 'id'>): Promise<string> {
    const result = await addDoc(this.tasksCollection, data);
    return result.id;
  }

  async updateProject(id: string, dto: Partial<Project>): Promise<void> {
    const ref = doc(this.projectsCollection, id);

    return updateDoc(ref, { ...dto });
  }

  private mapToProject(doc: QueryDocumentSnapshot<DocumentData>): Project {
    const data = doc.data();

    return {
      id: doc.id,
      name: data['name'],
      description: data['description'] ?? null,
      deadline: data['deadline']?.toDate() ?? null,
    };
  }
}