import { TestBed } from '@angular/core/testing';

import { InjectJsonToFirestoreService } from './inject-json-to-firestore.service';

describe('InjectJsonToFirestoreService', () => {
  let service: InjectJsonToFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InjectJsonToFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
