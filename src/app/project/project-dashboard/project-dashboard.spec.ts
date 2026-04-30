import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectFacade, ProjectState } from '../project-facade';
import { ProjectDashboard } from './project-dashboard';

describe('ProjectDashboard', () => {
  let component: ProjectDashboard;
  let fixture: ComponentFixture<ProjectDashboard>;

  const projectState = signal<ProjectState>({ status: 'loading' });

  let mockRouter = {
    navigate: vi.fn(),
  };

  let mockRoute = {};

  let mockFacade = {
    state: projectState.asReadonly(),
  };

  beforeEach(async () => {
    mockRouter.navigate.mockReset();

    await TestBed.configureTestingModule({
      imports: [ProjectDashboard],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: ProjectFacade, useValue: mockFacade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose projects state from facade', () => {
    const mockState = {
      status: 'success',
      data: [{ id: '1', name: 'Test', deadline: '01-01-2026' }],
    };

    projectState.set({
      status: 'success',
      data: [{ id: '1', name: 'Test', deadline: '01-01-2026' }],
    });

    expect(component.projectsState()).toEqual(mockState);
  });

  it('should navigate to project id relative to current route', () => {
    component.onClickProject('123');

    expect(mockRouter.navigate).toHaveBeenCalledWith(['123'], { relativeTo: mockRoute });
  });

  it('should navigate to create route relative to current route', () => {
    component.onAddProject();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['create'], { relativeTo: mockRoute });
  });
});
