import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionBanner } from './version-banner';

describe('VersionBanner', () => {
  let component: VersionBanner;
  let fixture: ComponentFixture<VersionBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersionBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(VersionBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
