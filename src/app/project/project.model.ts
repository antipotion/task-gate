export type ProjectStatusModel = 'not started' | 'in progress' | 'completed';

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
  deadline: string;
};
