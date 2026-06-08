import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskReviewList } from './task-review-list';

describe('TaskReviewList', () => {
  let component: TaskReviewList;
  let fixture: ComponentFixture<TaskReviewList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskReviewList],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskReviewList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
