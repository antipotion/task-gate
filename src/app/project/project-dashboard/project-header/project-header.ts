import { Component, input } from '@angular/core';

@Component({
  selector: 'app-project-header',
  imports: [],
  templateUrl: './project-header.html',
  styleUrl: './project-header.scss',
})
export class ProjectHeader {
  projectName = input.required<string>();
}
