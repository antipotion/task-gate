import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSubtask } from './task-subtask';

describe('TaskSubtask', () => {
  let component: TaskSubtask;
  let fixture: ComponentFixture<TaskSubtask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskSubtask],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskSubtask);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
