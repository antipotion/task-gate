export type RoleModel = 'MANAGER' | 'MEMBER';

export interface UserModel {
  id: string;
  accountId: string;
  role: RoleModel;
  teamId: string;
}