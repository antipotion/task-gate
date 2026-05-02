import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTime } from './task-time';

describe('TaskTime', () => {
  let component: TaskTime;
  let fixture: ComponentFixture<TaskTime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTime],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskTime);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
