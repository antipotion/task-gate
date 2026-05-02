import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComment } from './task-comment';

describe('TaskComment', () => {
  let component: TaskComment;
  let fixture: ComponentFixture<TaskComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComment],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
