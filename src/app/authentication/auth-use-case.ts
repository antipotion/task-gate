import { computed, inject, Injectable } from '@angular/core';
import { UserCredential } from 'firebase/auth';
import { FirebaseAuth } from '../infrastructure/auth/firebase-auth';
import { FirestoreProjectRepository } from '../infrastructure/firestore/firestore-project-repository';
import { TeamModel } from '../team/team.model';
import { RoleModel, UserModel } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthUseCase {
  private readonly _auth = inject(FirebaseAuth);
  private readonly _repo = inject(FirestoreProjectRepository);

  private readonly _userId = computed<string | null>(() => this._auth.userId());

  async login(email: string, password: string): Promise<UserCredential> {
    return this._auth.login(email, password);
  }

  loginWithGoogle(): void {
    this._auth.loginWithGoogle();
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: RoleModel,
  ): Promise<UserModel | null> {
    await this._auth.register(email, password);

    const accountId = this._auth.user()?.uid;
    if (!accountId) return null;

    return await this.addUser(firstName, lastName, role);
  }

  async addUser(firstName: string, lastName: string, role: RoleModel): Promise<UserModel> {
    const userId = this._userId();

    if (!userId) {
      throw new Error('User id does not exist');
    }

    const data: Omit<UserModel, 'id'> = {
      firstName,
      lastName,
      role,
    };

    await this._repo.addUser(data, userId);

    return { ...data, id: userId };
  }
}
