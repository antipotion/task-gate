import { Injectable } from '@angular/core';
import { RoleModel } from '../../authentication/auth.model';

const SESSION_STORAGE_KEYS = {
  userRole: 'userRole',
  teamId: 'teamId',
} as const;

@Injectable({
  providedIn: 'root',
})
export class SignupSessionStorage {
  getTeamId(): string | null {
    return localStorage.getItem(SESSION_STORAGE_KEYS.teamId);
  }

  getUserRole(): RoleModel | null {
    const value = localStorage.getItem(SESSION_STORAGE_KEYS.userRole);

    if (!value) return null;

    return value as RoleModel;
  }

  saveTeamId(teamId: string): void {
    localStorage.setItem(SESSION_STORAGE_KEYS.teamId, teamId);
  }

  saveUserRole(userRole: RoleModel): void {
    localStorage.setItem(SESSION_STORAGE_KEYS.userRole, userRole);
  }

  clearSessionKeys(): void {
    localStorage.removeItem(SESSION_STORAGE_KEYS.teamId);
    localStorage.removeItem(SESSION_STORAGE_KEYS.userRole);
  }
}
