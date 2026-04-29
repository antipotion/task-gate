import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDashboard } from './project-dashboard';
import { provideRouter } from '@angular/router';
import { ProjectFacade } from '../project-facade';

describe('ProjectDashboard', () => {
  let component: ProjectDashboard;
  let fixture: ComponentFixture<ProjectDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDashboard],
      providers: [provideRouter([]), ProjectFacade]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
