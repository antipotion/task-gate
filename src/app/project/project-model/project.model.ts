export type ProjectStatusModel = 'not started' | 'in progress' | 'completed';

export type DeadlinePressureModel =
  | 'unknown'
  | 'healthy'
  | 'stable'
  | 'warning'
  | 'critical'
  | 'overdue';

export type Project = {
  id: string;
  name: string;
  creatorId: string;
  teamId: string;
  description: string | null;
  startDate: Date | null;
  deadline: Date | null;
  status: ProjectStatusModel;
};
