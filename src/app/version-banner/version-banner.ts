import { Component } from '@angular/core';
import { PROJECT_INFO } from './project-info';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-version-banner',
  imports: [TitleCasePipe],
  templateUrl: './version-banner.html',
  styleUrl: './version-banner.scss',
})
export class VersionBanner {
  readonly projectInfo = PROJECT_INFO;
}
