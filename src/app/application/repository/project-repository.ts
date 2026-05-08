import type { Observable } from "rxjs";
import type { Project } from "../../project/project.model";
import type { Task } from "../../project/task/task.model";
import { UserModel } from "../../authentication/auth.model";
import { TeamModel } from "../../authentication/sign-up/team/team.model";

export abstract class ProjectRepository {
  abstract listenToProjects$(): Observable<Project[]>;
  abstract listenToTasks$(): Observable<Task[]>;
  abstract listenToTeams$(): Observable<TeamModel[]>;

  abstract addProject(data: Omit<Project, 'id'>): Promise<string>;
  abstract addTask(data: Omit<Task, 'id'>): Promise<string>;
  abstract updateProject(projectId: string, dto: Partial<Project>): Promise<void>;
  abstract updateTask(taskId: string, dto: Partial<Task>): Promise<void>;
  abstract deleteProject(projectId: string): Promise<void>;
  abstract deleteTask(taskId: string): Promise<void>;
  abstract addUser(data: Partial<UserModel>): Promise<string>;
  abstract addTeam(data: Partial<TeamModel>): Promise<string>;
}