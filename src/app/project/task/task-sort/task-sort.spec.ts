import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTodo } from './task-todo';

describe('TaskTodo', () => {
  let component: TaskTodo;
  let fixture: ComponentFixture<TaskTodo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTodo],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskTodo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
