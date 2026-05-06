import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWarningDialog } from './project-warning-dialog';

describe('ProjectWarningDialog', () => {
  let component: ProjectWarningDialog;
  let fixture: ComponentFixture<ProjectWarningDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectWarningDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectWarningDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
