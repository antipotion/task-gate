import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskCategory } from './project-task-category';

describe('ProjectTaskCategory', () => {
  let component: ProjectTaskCategory;
  let fixture: ComponentFixture<ProjectTaskCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTaskCategory],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectTaskCategory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
