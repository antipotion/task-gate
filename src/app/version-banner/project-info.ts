import packageData from '../../../package.json' with { type: 'json' };

export type ProjectDevelopmentStatus = 'active development' | 'maintenance' | 'stable' | 'paused';

const pVersion = packageData.version;

export interface ProjectInfoModel {
  projectName: string;
  projectVersion: string;
  projectStatus: ProjectDevelopmentStatus;
}

export const PROJECT_INFO: ProjectInfoModel = {
  projectName: 'Task Gate',
  projectVersion: `v${pVersion}`,
  projectStatus: 'active development',
};
