import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { MobileShell } from '../../../../layout-shell/mobile-shell/mobile-shell';
import { TabletShell } from '../../../../layout-shell/tablet-shell/tablet-shell';
import { Comment } from '../comment/comment';
import { ReviewDetail } from '../review-detail/review-detail';
import { ReviewFacade } from '../review-facade/review-facade';
import { REVIEW_ROUTE_PARAMS } from '../review.routes';

@Component({
  selector: 'app-review-detail-shell',
  imports: [ReviewDetail, MobileShell, TabletShell, Comment],
  templateUrl: './review-detail-shell.html',
  styleUrl: './review-detail-shell.scss',
})
export class ReviewDetailShell {
  private readonly _reviewFacade = inject(ReviewFacade);
  private readonly _route = inject(ActivatedRoute);

  readonly isMobileScreen = computed(() => this._reviewFacade.isMobileScreen());
  readonly urlSegments = toSignal(this._route.url);
  readonly routeDiscussion = signal<boolean>(false);

  constructor() {
    effect(() => {
      const urlSegments = this.urlSegments();
      if (!urlSegments) return;

      const discussionRoute = urlSegments[1];
      if (!discussionRoute) return;
      if (discussionRoute.toString() !== REVIEW_ROUTE_PARAMS.discussion) return;
      this.routeDiscussion.set(true);
    });
  }
}
