export type RoleModel = 'MANAGER' | 'MEMBER';

export interface UserModel {
  id: string;
  role: RoleModel;
}