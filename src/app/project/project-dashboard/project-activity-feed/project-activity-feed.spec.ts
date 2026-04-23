import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectActivityFeed } from './project-activity-feed';

describe('ProjectActivityFeed', () => {
  let component: ProjectActivityFeed;
  let fixture: ComponentFixture<ProjectActivityFeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectActivityFeed],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectActivityFeed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
