import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutContent } from './about-content';

describe('AboutContent', () => {
  let component: AboutContent;
  let fixture: ComponentFixture<AboutContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutContent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
