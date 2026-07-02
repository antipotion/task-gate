import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailShell } from './project-detail-shell';

describe('ProjectDetailShell', () => {
  let component: ProjectDetailShell;
  let fixture: ComponentFixture<ProjectDetailShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailShell],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
