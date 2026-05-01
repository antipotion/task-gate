type Member = {
  id: string;
  name: string;
};

type Team = {
  id: string;
  name: string;
  members: Member[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
  deadline: string;
};