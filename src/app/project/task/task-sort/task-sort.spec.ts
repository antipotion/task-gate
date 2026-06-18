import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSort } from './task-sort';

describe('TaskTodo', () => {
  let component: TaskSort;
  let fixture: ComponentFixture<TaskSort>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskSort],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskSort);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
