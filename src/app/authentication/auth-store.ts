import { inject, Injectable } from '@angular/core';
import { SignupSessionStorage } from '../infrastructure/signup-session-storage/signup-session-storage';
import { RoleModel } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly _signupSessionStorage = inject(SignupSessionStorage);

  getTeamId(): string | null {
    return this._signupSessionStorage.getTeamId();
  }

  getUserRole(): RoleModel | null {
    return this._signupSessionStorage.getUserRole();
  }

  saveTeamId(teamId: string): void {
    this._signupSessionStorage.saveTeamId(teamId);
  }

  saveUserRole(userRole: RoleModel): void {
    this._signupSessionStorage.saveUserRole(userRole);
  }

  clearSessionKeys(): void {
    this._signupSessionStorage.clearSessionKeys();
  }
}
