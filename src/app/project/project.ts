import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectFacade } from './project-facade/project-facade';
import { ProjectUseCase } from './project-usecase/project-use-case';
import { TaskFacade } from './task/task-facade';

@Component({
  selector: 'app-project',
  imports: [RouterOutlet],
  templateUrl: './project.html',
  styleUrl: './project.scss',
  providers: [ProjectFacade, ProjectUseCase, TaskFacade],
})
export class Project {}
