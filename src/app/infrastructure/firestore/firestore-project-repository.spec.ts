import { TestBed } from '@angular/core/testing';
import { FirestoreProjectRepository } from './firestore-project-repository';

describe('FirestoreProjectRepository', () => {
  let service: FirestoreProjectRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreProjectRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
