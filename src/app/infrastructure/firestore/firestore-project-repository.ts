import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  setDoc,
  updateDoc,
  where,
  type DocumentData,
  type Firestore,
  type QuerySnapshot,
} from 'firebase/firestore';
import { Observable, of } from 'rxjs';
import { db } from '../../../environment/firebase.config';
import { UserModel } from '../../authentication/auth.model';
import { TeamModel } from '../../team/team.model';
import type { Project } from '../../project/project.model';
import type { Task } from '../../project/task/task.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreProjectRepository {
  private readonly _db: Firestore = db;
  private readonly _projectsCollection = collection(this._db, 'projects');
  private readonly _tasksCollection = collection(this._db, 'tasks');
  private readonly _usersCollection = collection(this._db, 'users');
  private readonly _teamsCollection = collection(this._db, 'teams');

  listenToProjects$(teams: TeamModel[]): Observable<Project[]> {
    const teamIds = teams.map((team) => team.id);

    // Guard against empty array
    if (teamIds.length === 0) {
      return of([]);
    }

    const projectQuery = query(this._projectsCollection, where('teamId', 'in', teamIds));

    return new Observable<Project[]>((subscriber) => {
      const unsubscribe = onSnapshot(
        projectQuery,
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
        this._tasksCollection,
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

  listenToTeams$(userId: string): Observable<TeamModel[]> {
    const teamsQuery = query(this._teamsCollection, where('memberIds', 'array-contains', userId));

    return new Observable<TeamModel[]>((subscriber) => {
      const unsubscribe = onSnapshot(
        teamsQuery,
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

  listenToUser$(userId: string): Observable<UserModel> {
    return new Observable<UserModel>((subscriber) => {
      const userRef = doc(this._usersCollection, userId);

      const unsubscribe = onSnapshot(
        userRef,
        (snapshot) => {
          if (!snapshot.exists()) return;

          const user = this.mapToUser(snapshot);

          subscriber.next(user);
        },
        (error) => {
          subscriber.error(error);
        },
      );

      return () => unsubscribe();
    });
  }

  async addProject(data: Omit<Project, 'id'>): Promise<string> {
    const result = await addDoc(this._projectsCollection, data);
    return result.id;
  }

  async addTask(data: Omit<Task, 'id'>): Promise<string> {
    const result = await addDoc(this._tasksCollection, data);
    return result.id;
  }

  async addUser(data: Omit<UserModel, 'id'>, userId: string): Promise<void> {
    const docRef = doc(this._usersCollection, userId);
    await setDoc(docRef, data);
  }

  async addTeam(data: Omit<TeamModel, 'id'>): Promise<string> {
    const result = await addDoc(this._teamsCollection, data);

    return result.id;
  }

  async updateProject(projectId: string, dto: Partial<Project>): Promise<void> {
    const ref = doc(this._projectsCollection, projectId);

    return updateDoc(ref, { ...dto });
  }

  async updateTask(taskId: string, dto: Partial<Task>): Promise<void> {
    const ref = doc(this._tasksCollection, taskId);

    return updateDoc(ref, { ...dto });
  }

  async deleteProject(projectId: string): Promise<void> {
    const ref = doc(this._projectsCollection, projectId);

    return deleteDoc(ref);
  }

  async deleteTask(taskId: string): Promise<void> {
    const ref = doc(this._tasksCollection, taskId);

    return deleteDoc(ref);
  }

  private mapToProject(doc: QueryDocumentSnapshot<DocumentData>): Project {
    const data = doc.data();

    return {
      id: doc.id,
      name: data['name'],
      creatorId: data['creatorId'],
      teamId: data['teamId'],
      description: data['description'],
      startDate: data['startDate']?.toDate(),
      deadline: data['deadline']?.toDate(),
    };
  }

  private mapToTask(doc: QueryDocumentSnapshot<DocumentData>): Task {
    const data = doc.data();

    return {
      projectId: data['projectId'],
      id: doc.id,
      name: data['name'],
      creatorId: data['creatorId'],
      assigneeId: data['assigneeId'],
      description: data['description'] ?? null,
      deadline: data['deadline']?.toDate(),
      status: data['status'],
      currentSubmissionVersion: data['currentSubmissionVersion'],
    };
  }

  private mapToTeam(doc: QueryDocumentSnapshot<DocumentData>): TeamModel {
    const data = doc.data();

    return {
      id: doc.id,
      name: data['name'],
      creatorId: data['creatorId'],
      memberIds: data['memberIds'],
    };
  }

  private mapToUser(doc: QueryDocumentSnapshot<DocumentData>): UserModel {
    const data = doc.data();

    return {
      id: doc.id,
      role: data['role'],
    };
  }
}
