export type RoleModel = 'MANAGER' | 'MEMBER';

export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  role: RoleModel;
}