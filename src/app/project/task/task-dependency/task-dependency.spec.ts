import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDependency } from './task-dependency';

describe('TaskDependency', () => {
  let component: TaskDependency;
  let fixture: ComponentFixture<TaskDependency>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDependency],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDependency);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
