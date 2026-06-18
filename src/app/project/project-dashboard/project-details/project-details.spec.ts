import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { ProjectFacade } from '../../project-facade';
import { Project } from '../../project.model';
import { ProjectDetails } from './project-details';

describe('ProjectDetails', () => {
  let component: ProjectDetails;
  let fixture: ComponentFixture<ProjectDetails>;

  let activeProject: ReturnType<typeof signal<Project | null>>;

  activeProject = signal<Project | null>(null);

  const mockRouter = {
    navigate: vi.fn(),
  };

  const mockFacade = {
    activeProject,
    getActiveProject: vi.fn(),
  };

  const mockRoute = {
    snapshot: {
      paramMap: {
        get: vi.fn().mockReturnValue('123'),
      },
    },
    parent: {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetails],
      providers: [
        provideRouter([]),
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: ProjectFacade, useValue: mockFacade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back relative to parent route', () => {
    component.onBack();

    expect(mockRouter.navigate).toHaveBeenCalledWith([''], { relativeTo: mockRoute.parent });
  });
});
