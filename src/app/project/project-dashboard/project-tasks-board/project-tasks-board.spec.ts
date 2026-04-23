import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTasksBoard } from './project-tasks-board';

describe('ProjectTasksBoard', () => {
  let component: ProjectTasksBoard;
  let fixture: ComponentFixture<ProjectTasksBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTasksBoard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectTasksBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
