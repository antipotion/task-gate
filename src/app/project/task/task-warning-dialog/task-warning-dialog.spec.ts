import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskWarningDialog } from './task-warning-dialog';

describe('TaskWarningDialog', () => {
  let component: TaskWarningDialog;
  let fixture: ComponentFixture<TaskWarningDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskWarningDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskWarningDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
