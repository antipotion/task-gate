import { computed, inject, Injectable } from '@angular/core';
import { UserCredential } from 'firebase/auth';
import { FirebaseAuth } from '../infrastructure/auth/firebase-auth';
import { FirestoreProjectRepository } from '../infrastructure/firestore/firestore-project-repository';
import { RoleModel, UserModel } from './auth.model';
import { TeamModel } from './sign-up/team/team.model';

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

  async register(email: string, password: string, role: RoleModel): Promise<UserModel | null> {
    await this._auth.register(email, password);

    const accountId = this._auth.user()?.uid;
    if (!accountId) return null;

    return await this.addUser(role);
  }

  async addUser(role: RoleModel): Promise<UserModel> {
    const userId = this._userId();

    if (!userId) {
      throw new Error('User id does not exist');
    }

    const data: Omit<UserModel, 'id'> = {
      role,
    };

    await this._repo.addUser(data, userId);

    return { ...data, id: userId };
  }

  async addTeam(teamName: string, userId: string): Promise<TeamModel> {
    const data: Omit<TeamModel, 'id'> = { name: teamName, memberIds: [userId] };

    const id = await this._repo.addTeam(data);

    return {
      id,
      name: data.name,
      memberIds: data.memberIds,
    };
  }
}
