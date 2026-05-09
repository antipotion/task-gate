import { inject, Injectable } from '@angular/core';
import { ProjectRepository } from '../application/repository/project-repository';
import { FirebaseAuth } from '../infrastructure/auth/firebase-auth';
import { RoleModel, UserModel } from './auth.model';
import { TeamModel } from './sign-up/team/team.model';

@Injectable({ providedIn: 'root' })
export class AuthUseCase {
  private readonly _auth = inject(FirebaseAuth);
  private readonly _repo = inject(ProjectRepository);

  login(email: string, password: string): void {
    this._auth.login(email, password);
  }

  loginWithGoogle(): void {
    this._auth.loginWithGoogle();
  }

  async register(
    email: string,
    password: string,
    role: RoleModel,
    teamId: string,
  ): Promise<UserModel | null> {
    try {
      await this._auth.register(email, password);
    } catch (error) {
      console.error(error);
    }

    const accountId = this._auth.user()?.uid;
    if (!accountId) return null;

    return await this.addUser(accountId, role, teamId);
  }

  async addUser(accountId: string, role: RoleModel, teamId: string): Promise<UserModel> {
    const data: Omit<UserModel, 'id'> = {
      accountId,
      role,
      teamId,
    };

    const id = await this._repo.addUser(data);

    return { ...data, id };
  }

  async addTeam(teamName: string): Promise<TeamModel> {
    const data = { name: teamName };

    const id = await this._repo.addTeam(data);

    return {
      id,
      name: data.name,
    };
  }
}
