export type ProjectStatusModel = 'not started' | 'in progress' | 'completed';

export type DeadlinePressureModel = 'healthy' | 'stable' | 'warning' | 'critical' | 'overdue';

type Member = {
  id: string;
  name: string;
};

export type Project = {
  id: string;
  name: string;
  creatorId: string;
  teamId: string;
  description: string;
  startDate: string;
  deadline: string;
};
