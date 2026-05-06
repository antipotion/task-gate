import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInProgress } from './task-in-progress';

describe('TaskInProgress', () => {
  let component: TaskInProgress;
  let fixture: ComponentFixture<TaskInProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskInProgress],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskInProgress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
