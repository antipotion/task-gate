import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetails } from './project-details';
import { provideRouter } from '@angular/router';
import { ProjectFacade } from '../../project-facade';

describe('ProjectDetails', () => {
  let component: ProjectDetails;
  let fixture: ComponentFixture<ProjectDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetails],
      providers: [provideRouter([]), ProjectFacade]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
