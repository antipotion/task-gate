import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskBoardCard } from './project-task-board-card';

describe('ProjectTaskBoardCard', () => {
  let component: ProjectTaskBoardCard;
  let fixture: ComponentFixture<ProjectTaskBoardCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTaskBoardCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectTaskBoardCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
