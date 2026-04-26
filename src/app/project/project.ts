import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectFacade } from '../application/facades/project-facade';

@Component({
  selector: 'app-project',
  imports: [RouterOutlet],
  templateUrl: './project.html',
  styleUrl: './project.scss',
  providers: [ProjectFacade],
})
export class Project {}
