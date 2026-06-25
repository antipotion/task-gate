import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { StoreService } from '../../application/store/store-service';
import { ProjectFacade } from './project-facade';
import { Project } from './project.model';

describe('ProjectFacade', () => {
  let service: ProjectFacade;
  let projectsSubject: Subject<Project[]>;

  beforeEach(() => {
    projectsSubject = new Subject<Project[]>();

    TestBed.configureTestingModule({
      providers: [
        ProjectFacade,
        {
          provide: StoreService,
          useValue: {
            projects$: projectsSubject.asObservable(),
            // addProject: jasmine.createSpy('addProject'),
            // getProjectById$: jasmine.createSpy('getProjectById$'),
          },
        },
      ],
    });

    service = TestBed.inject(ProjectFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('keeps loading state until the first projects emission arrives', () => {
    expect(service.state()).toEqual({ status: 'loading' });

    const projects: Project[] = [
      {
        id: 'project-1',
        name: 'Task Gate',
        deadline: '2026-05-01',
      },
    ];

    projectsSubject.next(projects);

    expect(service.state()).toEqual({ status: 'success', data: projects });
  });

  it('shows an empty success state only after the first empty emission arrives', () => {
    expect(service.state()).toEqual({ status: 'loading' });

    projectsSubject.next([]);

    expect(service.state()).toEqual({ status: 'success', data: [] });
  });
});
