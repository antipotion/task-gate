import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  type DocumentData,
  type Firestore,
  type QueryDocumentSnapshot,
  type QuerySnapshot,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { db } from '../../../environment/firebase.config';
import { ProjectRepository } from '../../application/repository/project-repository';
import type { Project } from '../../project/project.model';
import type { Task } from '../../project/task/task.model';
import { UserModel } from '../../authentication/auth.model';
import { TeamModel } from '../../authentication/sign-up/team/team.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreProjectRepository extends ProjectRepository {
  private readonly db: Firestore = db;
  private readonly projectsCollection = collection(this.db, 'projects');
  private readonly tasksCollection = collection(this.db, 'tasks');
  private readonly usersCollection = collection(this.db, 'users');
  private readonly teamsCollection = collection(this.db, 'teams');

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

  listenToTasks$(): Observable<Task[]> {
    return new Observable<Task[]>((subscriber) => {
      const unsubscribe = onSnapshot(
        this.tasksCollection,
        (snapshot) => {
          const tasks = snapshot.docs.map((doc) => this.mapToTask(doc));

          subscriber.next(tasks);
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

  async updateProject(projectId: string, dto: Partial<Project>): Promise<void> {
    const ref = doc(this.projectsCollection, projectId);

    return updateDoc(ref, { ...dto });
  }

  async updateTask(taskId: string, dto: Partial<Task>): Promise<void> {
    const ref = doc(this.tasksCollection, taskId);

    return updateDoc(ref, { ...dto });
  }

  async deleteProject(projectId: string): Promise<void> {
    const ref = doc(this.projectsCollection, projectId);

    return await deleteDoc(ref);
  }

  async deleteTask(taskId: string): Promise<void> {
    const ref = doc(this.tasksCollection, taskId);

    return await deleteDoc(ref);
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

  private mapToTask(doc: QueryDocumentSnapshot<DocumentData>): Task {
    const data = doc.data();

    return {
      projectId: data['projectId'],
      id: doc.id,
      name: data['name'],
      description: data['description'] ?? null,
      deadline: data['deadline']?.toDate() ?? null,
      status: data['status'],
      currentSubmissionVersion: data['currentSubmissionVersion'],
    };
  }
  
  async addUser(data: Omit<UserModel, 'id'>): Promise<string> {
    const result = await addDoc(this.usersCollection, data);

    return result.id;
  }

  async addTeam(data: Omit<TeamModel, 'id'>): Promise<string> {
    const result = await addDoc(this.teamsCollection, data);

    return result.id;
  }
  
  listenToTeams$(): Observable<TeamModel[]> {
    return new Observable<TeamModel[]>((subscriber) => {
      const unsubscribe = onSnapshot(
        this.teamsCollection,
        (snapshot) => {
          const teams = snapshot.docs.map((doc) => this.mapToTeam(doc));

          subscriber.next(teams);
        },
        (error) => {
          subscriber.error(error);
        },
      );

      return () => unsubscribe();
    });
  }

  private mapToTeam(doc: QueryDocumentSnapshot<DocumentData>): TeamModel {
    const data = doc.data();
    
    return {
     id: doc.id,
      name: data['name'] ?? null,
    }
  }
}
