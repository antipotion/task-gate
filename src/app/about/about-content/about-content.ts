import { NgClass, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import packageJson from '../../../../package.json';
import { AccountType, SocialLinkModel, SOCIALS } from '../../author/social.config.';
import { PROJECT_SOURCE_LINK, ProjectSourceLinkModel } from '../../author/source.config';
import { PROJECT_INFO } from '../../version-banner/project-info';

@Component({
  selector: 'app-about-content',
  imports: [
    FontAwesomeModule,
    MatButtonModule,
    MatCardModule,
    MatButtonModule,
    TitleCasePipe,
    NgClass,
    MatIconModule,
  ],
  templateUrl: './about-content.html',
  styleUrl: './about-content.scss',
})
export class AboutContent {
  readonly version = packageJson.version;
  readonly authorName = packageJson.author.name;
  readonly authorEmail = packageJson.author.email;
  readonly authorWebsite = 'https://antipotion.com';
  readonly authorEmailLink = 'mailto:hello.antipotion@gmail.com';
  readonly projectInfo = PROJECT_INFO;
  readonly socialLinks: SocialLinkModel[] = SOCIALS;
  readonly projectSourceLinks: ProjectSourceLinkModel = PROJECT_SOURCE_LINK;
  readonly getCurrentYear = new Date().getFullYear();

  getSocialIcon(accountType: AccountType): IconDefinition {
    switch (accountType) {
      case 'github':
        return faGithub;
      case 'linkedIn':
        return faLinkedin;
      case 'xtwitter':
        return faXTwitter;
      case 'gmail':
        return faEnvelope;
    }
  }
}
