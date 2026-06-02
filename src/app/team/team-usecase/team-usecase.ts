import { computed, inject, Injectable } from '@angular/core';
import { FirebaseAuth } from '../../infrastructure/auth/firebase-auth';
import { FirestoreProjectRepository } from '../../infrastructure/firestore/firestore-project-repository';
import { TeamModel } from '../team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamUsecase {
  private readonly _auth = inject(FirebaseAuth);
  private readonly _repo = inject(FirestoreProjectRepository);

  private readonly _userId = computed<string | null>(() => this._auth.userId());

  async addTeam(teamName: string, userId: string): Promise<TeamModel> {
    const creatorId: string | null = this._userId();
    if (!creatorId) {
      throw new Error("Can't add team creatorId is missing");
    }

    const data: Omit<TeamModel, 'id'> = { name: teamName, memberIds: [userId], creatorId };

    const id = await this._repo.addTeam(data);

    return {
      id,
      name: data.name,
      memberIds: data.memberIds,
      creatorId,
    };
  }

  async joinTeam(teamId: string): Promise<void> {
    const userId = this._auth.userId();
    if (!userId) return;

    return this._repo.joinTeam(teamId, userId);
  }

  async leaveTeam(teamId: string): Promise<void> {
    const userId = this._auth.userId();
    if (!userId) return;

    return this._repo.leaveTeam(teamId, userId);
  }
}
