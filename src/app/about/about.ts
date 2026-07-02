import { Component, computed, inject } from '@angular/core';
import { MobileShell } from '../layout-shell/mobile-shell/mobile-shell';
import { TabletShell } from '../layout-shell/tablet-shell/tablet-shell';
import { NavigationService } from '../navigation/navigation-service';
import { AboutContent } from './about-content/about-content';

@Component({
  selector: 'app-about',
  imports: [MobileShell, TabletShell, AboutContent],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly _navigationService = inject(NavigationService);

  readonly isMobile = computed(() => this._navigationService.isMobileScreen());
}
