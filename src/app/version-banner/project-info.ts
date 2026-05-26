export type ProjectDevelopmentStatus = 'active development' | 'maintenance' | 'stable';

export interface ProjectInfoModel {
  projectName: string;
  projectVersion: string;
  projectStatus: ProjectDevelopmentStatus;
}

export const PROJECT_INFO: ProjectInfoModel = {
  projectName: 'Task Gate',
  projectVersion: 'v0.1.1-alpha',
  projectStatus: 'active development',
};
