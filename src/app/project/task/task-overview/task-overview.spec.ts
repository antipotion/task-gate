import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOverview } from './task-overview';

describe('TaskOverview', () => {
  let component: TaskOverview;
  let fixture: ComponentFixture<TaskOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
