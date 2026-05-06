import { TestBed } from '@angular/core/testing';

import { TaskUseCase } from './task-use-case';

describe('TaskUseCase', () => {
  let service: TaskUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
