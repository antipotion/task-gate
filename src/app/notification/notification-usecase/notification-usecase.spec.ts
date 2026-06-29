import { TestBed } from '@angular/core/testing';

import { NotificationUsecase } from './notification-usecase';

describe('NotificationUsecase', () => {
  let service: NotificationUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationUsecase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
