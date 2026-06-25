import { Injectable } from '@angular/core';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
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
import type { Project } from '../../project/project-model/project.model';
import { CommentModel, CommentModelDTO } from '../../project/task/review/comment/comment.model';
import { ReviewModel, ReviewModelDTO } from '../../project/task/review/review.model';
import type { Task } from '../../project/task/task.model';
import { TeamModel } from '../../team/team-model/team.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreProjectRepository {
  private readonly _db: Firestore = db;
  private readonly _projectsCollection = collection(this._db, 'projects');
  private readonly _tasksCollection = collection(this._db, 'tasks');
  private readonly _usersCollection = collection(this._db, 'users');
  private readonly _teamsCollection = collection(this._db, 'teams');
  private readonly _reviewsCollection = collection(this._db, 'reviews');
  private readonly _commentsCollection = collection(this._db, 'comments');

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
          const projects = snapshot.docs.map((doc) => this._mapToProject(doc));

          subscriber.next(projects);
        },
        (error) => {
          subscriber.error(error);
        },
      );

      return () => unsubscribe();
    });
  }

  listenToTasks$(projectId: string): Observable<Task[]> {
    const taskQuery = query(this._tasksCollection, where('projectId', '==', projectId));

    return new Observable<Task[]>((subscriber) => {
      const unsubscribe = onSnapshot(
        taskQuery,
        (snapshot) => {
          const tasks = snapshot.docs.map((doc) => this._mapToTask(doc));

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
          const teams = snapshot.docs.map((doc) => this._mapToTeam(doc));

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

          const user = this._mapToUser(snapshot);

          subscriber.next(user);
        },
        (error) => {
          subscriber.error(error);
        },
      );

      return () => unsubscribe();
    });
  }

  listenToReviews$(taskId: string): Observable<ReviewModel[]> {
    const reviewQuery = query(this._reviewsCollection, where('taskId', '==', taskId));

    return new Observable<ReviewModel[]>((subscriber) => {
      const unsubscribe = onSnapshot(
        reviewQuery,
        (snapshot: QuerySnapshot<DocumentData>) => {
          const reviews = snapshot.docs.map((doc) => this._mapToReview(doc));

          subscriber.next(reviews);
        },
        (error) => {
          subscriber.error(error);
        },
      );

      return () => unsubscribe();
    });
  }

  listenToReviewById$(reviewId: string): Observable<ReviewModel | null> {
    const reviewDoc = doc(this._reviewsCollection, reviewId);

    return new Observable<ReviewModel | null>((subscriber) => {
      const unsubscribe = onSnapshot(
        reviewDoc,
        (snapshot) => {
          if (!snapshot.exists()) {
            subscriber.next(null);
          }
          const review = this._mapToSingleReview(snapshot);

          subscriber.next(review);
        },
        (error) => {
          subscriber.error(error);
        },
      );

      return () => unsubscribe();
    });
  }

  listenToComments$(reviewId: string): Observable<CommentModel[]> {
    const commentQuery = query(this._commentsCollection, where('reviewId', '==', reviewId));

    return new Observable<CommentModel[]>((subscriber) => {
      const unsubscribe = onSnapshot(
        commentQuery,
        (snapshot: QuerySnapshot<DocumentData>) => {
          const comments = snapshot.docs.map((doc) => this._mapToComment(doc));
          comments.sort((a, b) => {
            const createdA = a.createdAt;
            const createdB = b.createdAt;

            return createdA.getTime() - createdB.getTime();
          });

          subscriber.next(comments);
        },
        (error) => {
          subscriber.error(error);
        },
      );

      return () => unsubscribe();
    });
  }

  listenToTask$(taskId: string): Observable<Task | null> {
    const taskDoc = doc(this._tasksCollection, taskId);

    return new Observable<Task | null>((subscriber) => {
      const unsubscribe = onSnapshot(taskDoc, (snapshot) => {
        if (!snapshot.exists()) {
          subscriber.next(null);
        }
        const task = this._mapToSingleTask(snapshot);
        subscriber.next(task);
      });
      return () => unsubscribe();
    });
  }

  async getProjectTasks(projectId: string): Promise<Task[]> {
    const taskQuery = query(this._tasksCollection, where('projectId', '==', projectId));
    const snapshot = await getDocs(taskQuery);

    return snapshot.docs.map((doc) => this._mapToTask(doc));
  }

  async addProject(data: Omit<Project, 'id'>): Promise<string> {
    const result = await addDoc(this._projectsCollection, data);
    return result.id;
  }

  async updateProject(projectId: string, dto: Partial<Project>): Promise<void> {
    const ref = doc(this._projectsCollection, projectId);

    return updateDoc(ref, { ...dto });
  }

  async deleteProject(projectId: string): Promise<void> {
    const ref = doc(this._projectsCollection, projectId);

    return deleteDoc(ref);
  }

  async addTask(data: Omit<Task, 'id'>): Promise<string> {
    const result = await addDoc(this._tasksCollection, data);
    return result.id;
  }

  async updateTask(taskId: string, dto: Partial<Task>): Promise<void> {
    const ref = doc(this._tasksCollection, taskId);

    return updateDoc(ref, { ...dto });
  }

  async deleteTask(taskId: string): Promise<void> {
    const ref = doc(this._tasksCollection, taskId);

    return deleteDoc(ref);
  }

  async addUser(data: Omit<UserModel, 'id'>, userId: string): Promise<void> {
    const docRef = doc(this._usersCollection, userId);
    await setDoc(docRef, data);
  }

  async addTeam(data: Omit<TeamModel, 'id'>): Promise<string> {
    const result = await addDoc(this._teamsCollection, data);

    return result.id;
  }

  async joinTeam(teamId: string, userId: string): Promise<void> {
    const teamRef = doc(this._teamsCollection, teamId);

    return updateDoc(teamRef, { memberIds: arrayUnion(userId) });
  }

  async leaveTeam(teamId: string, userId: string): Promise<void> {
    const teamRef = doc(this._teamsCollection, teamId);

    return updateDoc(teamRef, { memberIds: arrayRemove(userId) });
  }

  async getTeamById(teamId: string): Promise<TeamModel | null> {
    const docRef = doc(this._teamsCollection, teamId);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;

    const data = snapshot.data();

    return {
      id: snapshot.id,
      name: data['name'],
      creatorId: data['creatorId'],
      memberIds: data['memberIds'],
    };
  }

  async deleteTeam(teamId: string): Promise<void> {
    const ref = doc(this._teamsCollection, teamId);

    return deleteDoc(ref);
  }

  async addReview(data: Omit<ReviewModelDTO, 'id' | 'submittedAt'>): Promise<string> {
    const withSubmittedAt: Omit<ReviewModelDTO, 'id'> = { ...data, submittedAt: serverTimestamp() };

    const result = await addDoc(this._reviewsCollection, withSubmittedAt);
    return result.id;
  }

  async closeReview(reviewId: string, data: Pick<ReviewModelDTO, 'closeStatus'>): Promise<void> {
    const reviewRef = doc(this._reviewsCollection, reviewId);
    const withClosedDate = { ...data, closedDate: serverTimestamp() };

    return await updateDoc(reviewRef, { ...withClosedDate });
  }

  async addComment(data: Omit<CommentModelDTO, 'id' | 'createdAt'>): Promise<string> {
    const withCreatedAt: Omit<CommentModelDTO, 'id'> = { ...data, createdAt: serverTimestamp() };

    const result = await addDoc(this._commentsCollection, withCreatedAt);
    return result.id;
  }

  private _mapToProject(doc: QueryDocumentSnapshot<DocumentData>): Project {
    const data = doc.data();

    return {
      id: doc.id,
      name: data['name'],
      creatorId: data['creatorId'],
      teamId: data['teamId'],
      teamName: data['teamName'],
      description: data['description'] ?? null,
      startDate: data['startDate']?.toDate() ?? null,
      deadline: data['deadline']?.toDate() ?? null,
      status: data['status'] ?? 'not started',
    };
  }

  private _mapToTask(doc: QueryDocumentSnapshot<DocumentData>): Task {
    const data = doc.data();

    return {
      projectId: data['projectId'],
      id: doc.id,
      name: data['name'],
      creatorId: data['creatorId'],
      assigneeId: data['assigneeId'],
      description: data['description'] ?? null,
      startDate: data['startDate']?.toDate() ?? null,
      deadline: data['deadline']?.toDate() ?? null,
      status: data['status'],
    };
  }

  private _mapToTeam(doc: QueryDocumentSnapshot<DocumentData>): TeamModel {
    const data = doc.data();

    return {
      id: doc.id,
      name: data['name'],
      creatorId: data['creatorId'],
      memberIds: data['memberIds'],
    };
  }

  private _mapToUser(doc: QueryDocumentSnapshot<DocumentData>): UserModel {
    const data = doc.data();

    return {
      id: doc.id,
      firstName: data['firstName'],
      lastName: data['lastName'],
      role: data['role'],
    };
  }

  private _mapToReview(doc: QueryDocumentSnapshot<DocumentData>): ReviewModel {
    const data = doc.data();

    return {
      id: doc.id,
      taskId: data['taskId'],
      proofUrls: data['proofUrls'],
      submittedById: data['submittedById'],
      submittedAt: data['submittedAt']?.toDate(),
      reviewerId: data['reviewerId'],
      closedDate: data['closedDate']?.toDate() ?? null,
      closeStatus: data['closeStatus'],
    };
  }

  private _mapToSingleReview(doc: DocumentSnapshot<DocumentData>): ReviewModel | null {
    const data = doc.data();
    if (!data) return null;

    return {
      id: doc.id,
      taskId: data['taskId'],
      proofUrls: data['proofUrls'],
      submittedById: data['submittedById'],
      submittedAt: data['submittedAt']?.toDate(),
      reviewerId: data['reviewerId'],
      closedDate: data['closedDate']?.toDate() ?? null,
      closeStatus: data['closeStatus'],
    };
  }

  private _mapToComment(doc: QueryDocumentSnapshot<DocumentData>): CommentModel {
    const data = doc.data();

    return {
      id: doc.id,
      taskId: data['taskId'],
      reviewId: data['reviewId'],
      authorId: data['authorId'],
      content: data['content'],
      createdAt: data['createdAt']?.toDate(),
    };
  }

  private _mapToSingleTask(doc: DocumentSnapshot<DocumentData>): Task | null {
    const data = doc.data();
    if (!data) return null;

    return {
      id: doc.id,
      name: data['name'],
      assigneeId: data['assigneeId'],
      creatorId: data['creatorId'],
      deadline: data['deadline']?.toDate(),
      description: data['description'],
      projectId: data['projectId'],
      startDate: data['startDate']?.toDate(),
      status: data['status'],
    };
  }

  async getUserById(userId: string): Promise<UserModel | null> {
    const docRef = doc(this._usersCollection, userId);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;

    const data = snapshot.data();

    return {
      id: snapshot.id,
      firstName: data['firstName'],
      lastName: data['lastName'],
      role: data['role'],
    };
  }
}
