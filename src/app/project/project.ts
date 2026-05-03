import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectFacade } from './project-facade';
import { ProjectUseCase } from './project-use-case';

@Component({
  selector: 'app-project',
  imports: [RouterOutlet],
  templateUrl: './project.html',
  styleUrl: './project.scss',
  providers: [ProjectFacade, ProjectUseCase],
})
export class Project {}
