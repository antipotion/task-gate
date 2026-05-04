import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCompleted } from './task-completed';

describe('TaskCompleted', () => {
  let component: TaskCompleted;
  let fixture: ComponentFixture<TaskCompleted>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCompleted],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCompleted);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
