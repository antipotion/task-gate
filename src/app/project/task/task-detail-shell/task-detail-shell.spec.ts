import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailShell } from './task-detail-shell';

describe('TaskDetailShell', () => {
  let component: TaskDetailShell;
  let fixture: ComponentFixture<TaskDetailShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetailShell],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
