import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { AccountType, SocialLinkModel, SOCIALS } from '../author/social.config.';
import { PROJECT_SOURCE_LINK, ProjectSourceLinkModel } from '../author/source.config';

@Component({
  selector: 'app-footer',
  imports: [MatButtonModule, MatIconModule, FontAwesomeModule],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './footer.scss',
})
export class Footer {
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
