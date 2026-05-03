import type { Observable } from "rxjs";
import type { Project } from "../../project/project.model";
import type { Task } from "../../project/task/task.model";

export abstract class ProjectRepository {
  abstract listenToProjects$(): Observable<Project[]>;

  abstract addProject(data: Omit<Project, 'id'>): Promise<string>;
  abstract addTask(data: Omit<Task, 'id'>): Promise<string>;
  abstract updateProject(id: string, dto: Partial<Project>): Promise<void>;
}